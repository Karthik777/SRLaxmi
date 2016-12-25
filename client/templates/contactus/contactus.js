/**
 * Created by karthik on 24/12/16.
 */
Template.contactus.events({
    'submit form': function(event){
        event.preventDefault();
        var form = {
            name: event.target.name.value,
            category:event.target.category.value,
            message: event.target.message.value,
            email: event.target.email.value
        }
        Meteor.call("sendEmail",form, function(error,result){
            analytics.track("Contact Us", {
                eventName: "Email",
                couponValue: encodeURIComponent(event.target.email.value),
            });
            if(error){
                $("#mailresult").text("Email Not Sent");
            }
            else if(result === true){
                event.target.reset();
                $("#mailresult").text("Email Sent");
            }
        });
    }
});