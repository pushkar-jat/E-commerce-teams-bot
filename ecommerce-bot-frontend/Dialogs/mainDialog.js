const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../config.json')

const {productMain, productWaterfall } = require('./product/productDialog')
const {logInMain,logInWaterfall} = require('./login/loginDialog')
const {signUpMain,signUpWaterfall} = require('./signup/signupDialog')
const serviceList = require('../Cards/mainCard');
const {cardToDisplayAfterLogin} =require("../Cards/home/afterLoginCard")

// const { companyMain, companyWaterfall } = require('./company/companyDialog')

const { categoryMain, categoryWaterfall } = require('./category/categoryDialog')
 

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const mainWaterfall = 'mainWaterfall'

class MainDialog extends ComponentDialog {
    constructor(conversationState, userState) {
        super(mainWaterfall)

        this.conversationState = conversationState;
        this.userData = userState;

        this.addDialog(new categoryMain(this.userData))

        this.addDialog(new productMain(this.userData))

        this.addDialog(new logInMain(this.userData))
        
        this.addDialog(new signUpMain(this.userData))

        // this.addDialog(new companyMain(this.userData))


        this.addDialog(new WaterfallDialog(mainWaterfall, [
            this.initStep1.bind(this),
            this.finalStep2.bind(this)
        ]))
        this.initialDialogId = mainWaterfall
    }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async initStep1(step) {
        const userText = step.context.activity.value && step.context.activity.value.action || step.context.activity.text;
        const dialogData = step.options;
        let onTurnProperty = {};
        
        if (userText) {
            return await menuRedirection(step);
        }
        else{
            return await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.MainMenuServiceList))] });
        }
        return await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.MainMenuServiceList))] });
    }

    async finalStep2(step) {
        if(config.userDetails.data !== undefined){
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplayAfterLogin(config.MainMenuServiceListAfterLogin))] });
            Dialog.EndOfTurn;
        }
        else{
            return await step.replaceDialog(this.id)
        }

        
    }
    async finalStep3(step){
        return await step.replaceDialog(this.id)
    }

}

async function menuRedirection(step) {

    let text = step.context.activity.value && step.context.activity.value.action || step.context.activity.text;
    // if(userInput && userInput != 'undefined'){
    //     text=userInput;
    // }   
    step.options.text=text;
    await step.context.sendActivity({ type: ActionTypes.Typing });
    try {
        if (text) {
            switch (text) {
                case config.personList[0].nameToDisplay:
                    return await step.beginDialog('categoryWaterfall', step.options) 
                case config.personList[1].nameToDisplay:
                    return await step.beginDialog('productWaterfall', step.options)
                case config.personList[2].nameToDisplay:
                    await step.context.sendActivity("E-Commerce Bot, It is microsoft teams app for coroporate who work on teams so they can  shopping  or purchase order directly from teams app by using bot interface        Project done by Pushkar jat, Ranjit singh and priyank aggrawal");
                    
                case config.personList[3].nameToDisplay:
                    return await step.beginDialog('logInWaterfall', step.options) 
                   
                case config.personList[4].nameToDisplay:
                    return await step.beginDialog('signUpWaterfall', step.options)
                     
            }
        }
    }
    catch (error) {
        return await step.replaceDialog(this.id)
    }

}
async function menuRedirection1(step) {

    let text = step.context.activity.value && step.context.activity.value.action || step.context.activity.text;
    // if(userInput && userInput != 'undefined'){
    //     text=userInput;
    // }   
    await step.context.sendActivity({ type: ActionTypes.Typing });

    // return await 
        // if (text) {
        //     switch (text) {
        //         case config.MainMenuServiceListAfterLogin[0]:
        //             return await step.beginDialog('categoryWaterfall', step.options) 
        //             break;
        //         case config.MainMenuServiceListAfterLogin[1]:
        //             await step.context.sendActivity(config.MainMenuServiceListAfterLogin[1])
        //             break;
        //         case config.MainMenuServiceListAfterLogin[2]:
        //             await step.context.sendActivity(config.MainMenuServiceListAfterLogin[2])
        //             break;
        //         case config.MainMenuServiceListAfterLogin[4]:
        //             await step.context.sendActivity(config.MainMenuServiceListAfterLogin[3])
        //             break;
        //         case config.MainMenuServiceListAfterLogin[5]:
        //             await step.context.sendActivity(config.MainMenuServiceListAfterLogin[4])
        //             break;
                 
        //         default: 
        //             break;
        //     }
        // }
        // return Dialog.EndOfTurn
     

}

module.exports.MainDialog = MainDialog