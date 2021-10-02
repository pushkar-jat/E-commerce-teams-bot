const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../config.json') 
// const {getProductcompany } = require('../../api/company/companyApi')


const { productMain, productWaterfall } = require('./../product/productDialog')

const serviceList = require('../../Cards/category/categoryCard')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const companyWaterfall = 'companyWaterfall'

class companyMain extends ComponentDialog {
    constructor(userData) {
        super(companyWaterfall)
        
        this.userData = userData
        
        this.addDialog(new productMain(this.userData))
         
        this.addDialog(new WaterfallDialog(companyWaterfall, [
            this.companyWaterfallStep1.bind(this),
            this.companyWaterfallStep2.bind(this)
        ]))
        this.initialDialogId = companyWaterfall
    }

    async companyWaterfallStep1(step) {
  
        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.companyList))] })
        return Dialog.EndOfTurn
    }

    async companyWaterfallStep2(step) {
    let text = step.context.activity.value.msteams.displayText && step.context.activity.value.action || step.context.activity.text;
    
    await step.context.sendActivity({ type: ActionTypes.Typing });
    try {
        if (text) {
            // return await step.beginDialog('productWaterfall', step.options)
            return next();
                
        }
    } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }
}

module.exports.companyMain = companyMain
module.exports.companyWaterfall = companyWaterfall