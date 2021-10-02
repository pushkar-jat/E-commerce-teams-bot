const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../config.json')
const { getlogIns, getlogInsId } = require('../../api/logIn/logInApi')

const { cartMain, cartWaterfall } = require('../carts/cartDialog')
const { homeDialog,homeWaterfall} = require("../home/homeDialog")
const { signUpMain,signUpWaterfall} = require('../signup/signupDialog')
const {cardToDisplay} = require('../../Cards/logIn/logInCard')
const {cardToDisplayAfterLogin} = require('../../Cards/home/afterLoginCard')
const { logIn } = require('../../api/login/loginApi')
const {userState} = require('../../src/index')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const logInWaterfall = 'logInWaterfall' 
class logInMain extends ComponentDialog {
    constructor(userData,text) {
        super(logInWaterfall);

        this.userData = userData;

        this.text = text; 
         
        
        this.addDialog(new cartMain(this.userData));
        this.addDialog(new signUpMain(this.userData));
        this.addDialog(new homeDialog(this.userData));
        this.addDialog(new WaterfallDialog(logInWaterfall, [
            this.logInWaterfallStep1.bind(this),
            this.logInWaterfallStep2.bind(this),
            this.logInWaterfallStep3.bind(this)
        ]))
        this.initialDialogId = logInWaterfall
    }

    async logInWaterfallStep1(step) {  
        if(config.userDetails.data.length > 1)
        {
            await step.context.sendActivity("already login");
        }
        else{
            config.userDetails.data=undefined;
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay())] })
        } 
        
        return Dialog.EndOfTurn
    }

    async logInWaterfallStep2(step) {
        let text = step.context.activity.value || step.context.activity.value.action || step.context.activity.text;

        let person = {
            "email":`${text.Email}`,
            "password":`${text.Password}`
        }
        await step.context.sendActivity({ type: ActionTypes.Typing });
        
            if(config.userDetails.data == undefined){
                if(text.action == 'Login'){
                    const verify = await logIn(person);
                    step.options.verify = verify;
                    if(verify.message === 'Auth successful'){ 
                        // let data = userState(verify);
                        config.userDetails.data=verify;
                        await step.context.sendActivity("LogIn Successful");
                     if(step.options.action == undefined){
                       
                            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplayAfterLogin(config.MainMenuServiceListAfterLogin))] })
                            return Dialog.EndOfTurn
                        
                     }
                     else{
                        if(step.options.action === 'Add to cart'){
                            await step.context.sendActivity("Product added to cart successfully")
                            await step.beginDialog('homeWaterfall',step);
                            return Dialog.EndOfTurn
                        }
                        else if(step.options.action === 'Buy Now'){
                            await step.beginDialog('cartWaterfall',step.options,verify)
                            return Dialog.EndOfTurn

                        }
                        else{
                            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplayAfterLogin(config.MainMenuServiceListAfterLogin))] })
                            return Dialog.EndOfTurn

                        }
                     }
                    }
                    else if(text.action == 'signup'){
                        return await step.beginDialog('signUpWaterfall',step.options,verify)
        
                    }
                    else{
                        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplayAfterLogin(config.MainMenuServiceListAfterLogin))] })
                        return Dialog.EndOfTurn
                    }}
            }
            else{
                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplayAfterLogin(config.MainMenuServiceListAfterLogin))] })
                return Dialog.EndOfTurn
            } 
    }
    async logInWaterfallStep3(step) {

        return menuRedirection(step);
    }
    
    

}
async function menuRedirection(step) {

    let text = step.context.activity.value && step.context.activity.value.action || step.context.activity.text;
    // if(userInput && userInput != 'undefined'){
    //     text=userInput;
    // }   
    await step.context.sendActivity({ type: ActionTypes.Typing });

        if (text) {
            switch (text) {
                case config.MainMenuServiceListAfterLogin[0]:
                    return await step.beginDialog('categoryWaterfall', step.options) 
                    break;
                case config.MainMenuServiceListAfterLogin[1]:
                    await step.context.sendActivity(config.MainMenuServiceListAfterLogin[1])
                    break;
                case config.MainMenuServiceListAfterLogin[2]:
                    await step.context.sendActivity(config.MainMenuServiceListAfterLogin[2])
                    break;
                case config.MainMenuServiceListAfterLogin[4]:
                    await step.context.sendActivity(config.MainMenuServiceListAfterLogin[3])
                    break;
                case config.MainMenuServiceListAfterLogin[5]:
                    await step.context.sendActivity(config.MainMenuServiceListAfterLogin[4])
                    break;
                 
                default: 
                    break;
            }
        }
        return Dialog.EndOfTurn
     

}


module.exports.logInMain = logInMain
module.exports.logInWaterfall = logInWaterfall