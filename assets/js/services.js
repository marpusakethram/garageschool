// Sends sign-ups and feedback to Google Forms, and wraps Firebase sign-in.
(function () {
  'use strict';

  window.VSForms = {
    ready: function (kind) { var f = (window.VS_FORMS || {})[kind]; return !!(f && f.post); },
    // data keys are the question titles used in tools/create-forms.gs
    send: function (kind, data) {
      var f = (window.VS_FORMS || {})[kind];
      if (!f || !f.post) return Promise.resolve(false);
      var body = new URLSearchParams();
      Object.keys(data).forEach(function (k) {
        var entry = f.entries[k];
        if (entry && data[k] != null && data[k] !== '') body.append(entry, String(data[k]).slice(0, 2000));
      });
      // Google Forms does not allow reading the response, so success means "sent".
      return fetch(f.post, { method: 'POST', mode: 'no-cors', body: body }).then(function () { return true; }, function () { return false; });
    }
  };

  var SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  var loading = null;
  function load(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = function () { reject(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function auth() {
    if (!window.VS_FIREBASE) return Promise.reject(new Error('Sign-in is not set up yet.'));
    if (!loading) {
      loading = load(SDK + 'firebase-app-compat.js').then(function () { return load(SDK + 'firebase-auth-compat.js'); }).then(function () {
        if (!window.firebase.apps.length) window.firebase.initializeApp(window.VS_FIREBASE);
        return window.firebase.auth();
      });
    }
    return loading;
  }
  function user(u, method) { return { uid: u.uid, name: u.displayName || '', email: u.email || '', method: method }; }
  function friendly(err) {
    var code = (err && err.code) || '';
    var map = {
      'auth/email-already-in-use': 'That email already has an account. Log in instead.',
      'auth/invalid-credential': 'That email and password do not match. Check them and try again.',
      'auth/wrong-password': 'That email and password do not match. Check them and try again.',
      'auth/user-not-found': 'There is no account with that email. Create one instead.',
      'auth/weak-password': 'Use a password with at least 8 characters.',
      'auth/invalid-email': 'That email address does not look right.',
      'auth/popup-closed-by-user': 'The sign-in window was closed before finishing.',
      'auth/popup-blocked': 'Your browser blocked the sign-in window. Allow pop-ups for this site and try again.',
      'auth/unauthorized-domain': 'This web address is not allowed to sign in yet. Add it under Authorized domains in Firebase.'
    };
    return new Error(map[code] || (err && err.message) || 'Sign-in failed. Try again.');
  }

  window.VSAuth = {
    enabled: function () { return !!window.VS_FIREBASE; },
    providers: function () { return window.VS_AUTH_PROVIDERS || []; },
    google: function () {
      return auth().then(function (a) { return a.signInWithPopup(new window.firebase.auth.GoogleAuthProvider()); })
        .then(function (r) { return user(r.user, 'Google'); }, function (e) { throw friendly(e); });
    },
    twitter: function () {
      return auth().then(function (a) { return a.signInWithPopup(new window.firebase.auth.TwitterAuthProvider()); })
        .then(function (r) { return user(r.user, 'X'); }, function (e) { throw friendly(e); });
    },
    emailSignUp: function (email, password) {
      return auth().then(function (a) { return a.createUserWithEmailAndPassword(email, password); })
        .then(function (r) { return user(r.user, 'Email'); }, function (e) { throw friendly(e); });
    },
    emailSignIn: function (email, password) {
      return auth().then(function (a) { return a.signInWithEmailAndPassword(email, password); })
        .then(function (r) { return user(r.user, 'Email'); }, function (e) { throw friendly(e); });
    },
    signOut: function () { return window.VS_FIREBASE ? auth().then(function (a) { return a.signOut(); }) : Promise.resolve(); }
  };
})();
