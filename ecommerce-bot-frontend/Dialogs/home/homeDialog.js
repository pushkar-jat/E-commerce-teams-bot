const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
// const config = require('../../../config.json')

const { productMain, productWaterfall } = require('../product/productDialog') 
const { categoryMain, categoryWaterfall } = require('../category/categoryDialog')
const {cardToDisplay} = require('../../Cards/home/homeCard')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const homeWaterfall = 'homeWaterfall'

class homeDialog extends ComponentDialog {
    constructor(userState) {
        super(homeWaterfall)
 
        this.userData = userState
        this.addDialog(new categoryMain(this.userData))

        // this.addDialog(new productMain(this.userData))

        // this.addDialog(new companyMain(this.userData))

        this.addDialog(new WaterfallDialog(homeWaterfall, [
            this.initStep1.bind(this),
            this.finalStep2.bind(this)
        ]))
        this.initialDialogId = homeWaterfall
    }

     
    async initStep1(step) {
    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay())] })
    await step.context.sendActivity("sorry! home functionality available for prime customer only");
     
    return await step.context.sendActivity("For continue please select above any option");    
    }

    async finalStep2(step) {

        return menuRedirection(step);
    }

}

async function menuRedirection(step) {

    let text = step.context.activity.value && step.context.activity.value.action || step.context.activity.text;
    // if(userInput && userInput != 'undefined'){
    //     text=userInput;
    // }   
    await step.context.sendActivity({ type: ActionTypes.Typing });
    try {
        if (text) {
            switch (text) {
                case config.personList[0].nameToDisplay:
                    return await step.beginDialog('categoryWaterfall', step.options)
                case config.personList[1].nameToDisplay:
                    return await step.beginDialog('categoryWaterfall', step.options)
                case config.personList[2].nameToDisplay:
                    return await step.beginDialog('productWaterfall', step.options)
                case config.personList[3].nameToDisplay:
                    await step.context.sendActivity(config.personList[3].nameToDisplay)
                    break;
                 
                default:
                    return await step.replaceDialog()
                    break;
            }
        }
    }
    catch (error) {
        console.error(error);
    }

}

module.exports.homeDialog = homeDialog;

module.exports.homeWaterfall = homeWaterfall