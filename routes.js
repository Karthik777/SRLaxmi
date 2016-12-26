/**
 * Created by karthik on 26/12/16.
 */
Router.configure({
   layoutTemplate : 'layout'
});
Router.route('/',{
    name: 'home',
    template: 'container'
});

Router.route('/about',{
    name: 'about',
    template: 'about'
});