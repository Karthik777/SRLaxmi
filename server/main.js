import { Meteor } from 'meteor/meteor';

SSR.compileTemplate('emailText', Assets.getText('email-template.html'));

Meteor.methods({
    sendEmail: function(mailDetails) {
        var options = {
            apiKey: Meteor.settings.apiKey,
            domain: Meteor.settings.domain
        }
        // send the email!
        var message = SSR.render("emailText",
               {name: mailDetails.name ,
                category:mailDetails.category,
                message: mailDetails.message,
                email:mailDetails.email});
        var subject = mailDetails.name + ' wants to connect wrt to '+ mailDetails.category;
        Email.send({to: Meteor.settings.emailto, from: "angalamafc@gmail.com", text: message, subject: subject});
        return true;
    }
});
Meteor.startup(() => {
  // code to run on server at startup

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(Meteor.settings.username) + ':' + encodeURIComponent(Meteor.settings.password) + '@' + encodeURIComponent("smtp.gmail.com") + ':' + '465';

});
