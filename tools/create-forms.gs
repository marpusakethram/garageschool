/*
  VentureSim: creates the two Google Forms the website writes to.
  Paste into a new project at https://script.google.com, then run setupVentureSimForms.
  It logs a JSON block. Paste that block into assets/js/forms-config.js.
*/
var NOTIFY_EMAIL = 'marpu.sr@gmail.com';

function setupVentureSimForms() {
  var sheet = SpreadsheetApp.create('VentureSim responses');

  var signup = FormApp.create('VentureSim sign-ups');
  signup.setDescription('Every account created on VentureSim. The website fills this in automatically.');
  ['Account type', 'Name', 'Phone number', 'Email', 'What they do now', 'What they are building',
   'Sign-in method', 'Starting track'].forEach(function (t) { signup.addTextItem().setTitle(t); });
  signup.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  var feedback = FormApp.create('VentureSim feedback and questions');
  feedback.setDescription('Feedback after tests and questions from founders. The website fills this in automatically.');
  ['Type', 'Name', 'Email', 'Phone number', 'Rating (1 to 5)', 'Where (test or page)']
    .forEach(function (t) { feedback.addTextItem().setTitle(t); });
  feedback.addParagraphTextItem().setTitle('Message');
  feedback.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  ScriptApp.newTrigger('notifyOnFeedback').forForm(feedback).onFormSubmit().create();

  var out = { sheet: sheet.getUrl(), signup: describe(signup), feedback: describe(feedback) };
  Logger.log(JSON.stringify(out, null, 2));
  return out;
}

// Finds the entry.N field name for every question by building a pre-filled link.
function describe(form) {
  var items = form.getItems();
  var r = form.createResponse();
  items.forEach(function (item, k) {
    var t = item.getType();
    if (t == FormApp.ItemType.TEXT) r.withItemResponse(item.asTextItem().createResponse('Q' + k + 'Z'));
    if (t == FormApp.ItemType.PARAGRAPH_TEXT) r.withItemResponse(item.asParagraphTextItem().createResponse('Q' + k + 'Z'));
  });
  var url = r.toPrefilledUrl();
  var entries = {};
  items.forEach(function (item, k) {
    var m = url.match(new RegExp('entry\\.(\\d+)=Q' + k + 'Z'));
    if (m) entries[item.getTitle()] = 'entry.' + m[1];
  });
  return {
    edit: form.getEditUrl(),
    view: form.getPublishedUrl(),
    post: form.getPublishedUrl().replace(/viewform.*$/, 'formResponse'),
    entries: entries
  };
}

// Emails every feedback response and founder question to NOTIFY_EMAIL.
function notifyOnFeedback(e) {
  var lines = e.response.getItemResponses().map(function (ir) {
    return ir.getItem().getTitle() + ': ' + ir.getResponse();
  });
  var type = (e.response.getItemResponses()[0] || { getResponse: function () { return 'response'; } }).getResponse();
  MailApp.sendEmail(NOTIFY_EMAIL, 'VentureSim: new ' + type, lines.join('\n'));
}
