const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../config.json')
const { getsignUps, getsignUpsId } = require('../../api/signUp/signUpApi')
const {newCart } = require("../../api/carts/cartApi")
const {newOrder} = require("../../api/orders/orderApi")
const {homeDialog,homeWaterfall} = require("../home/homeDialog")

const { cartMain, cartWaterfall } = require('../carts/cartDialog')
const {MainDialog } = require('../../Dialogs/mainDialog')

const {cardToDisplay} = require('../../Cards/signUp/signUpCard')
const { signup } = require('../../api/signUp/signUpApi')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const signUpWaterfall = 'signUpWaterfall' 
class signUpMain extends ComponentDialog {
    constructor(userData,text) {
        super(signUpWaterfall);

        this.userData = userData;

        this.text = text; 
         
        
        this.addDialog(new homeDialog(this.userData));
        this.addDialog(new cartMain(this.userData));
        this.addDialog(new WaterfallDialog(signUpWaterfall, [
            this.signUpWaterfallStep1.bind(this),
            this.signUpWaterfallStep2.bind(this)
        ]))
        this.initialDialogId = signUpWaterfall
    }

    async signUpWaterfallStep1(step) { 
         
        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay())] })
        return Dialog.EndOfTurn
    }

    async signUpWaterfallStep2(step) {
        let text = step.context.activity.value || step.context.activity.value.action || step.context.activity.text;

        let person = {
            "email":`${text.Email}`,
            "password":`${text.Password}`,
            "firstName":`${text.firstName}`,
            "lastName":`${text.lastName}`,
            "userAddress":`${text.userAddress}`
        }
        await step.context.sendActivity({ type: ActionTypes.Typing });
        try {
            if(text.action == 'signup'){
            const verify = await signup(person);
            step.options.verify = verify;
            if(verify.message === 'User created'){ 
                
                await step.context.sendActivity("signUp Successful");
                const data = newCart(verify);
                const data1= newOrder(verify);
                if(step.options.action === 'Add to cart'){
                    return await step.EndOfDialog(step.options)
                }
                else if(step.options.action === 'Buy Now'){
                    return await step.beginDialog('cartWaterfall',step.options,verify)
                }
                else{
                    return await step.beginDialog('homeWaterfall',step);
                }
            }
            else{
                await step.context.sendActivity("signUp Failed, try again");
                return await step.replaceDialog(this.id);
            }
        }
        else if(text.actions == 'login'){
            
            return await step.beginDialog('loginWaterfall',step.options,verify)
        }
        
        } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }
}



module.exports.signUpMain = signUpMain
module.exports.signUpWaterfall = signUpWaterfall