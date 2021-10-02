const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../config.json') 
const {getProductcategory } = require('../../api/category/categoryApi')


const { productMain, productWaterfall } = require('./../product/productDialog')

const serviceList = require('../../Cards/category/categoryCard')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const categoryWaterfall = 'categoryWaterfall'

class categoryMain extends ComponentDialog {
    constructor(userData) {
        super(categoryWaterfall);
        
        this.userData = userData;
        
        // this.addDialog(new productMain(this.userData))
         
        this.addDialog(new WaterfallDialog(categoryWaterfall, [
            this.categoryWaterfallStep1.bind(this),
            this.categoryWaterfallStep2.bind(this)
        ]))
        this.initialDialogId = categoryWaterfall
    }

    async categoryWaterfallStep1(step) {
            if(step.options.text == "2. Company"){
                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.companyList))] })
            }
            else{
                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.categoryList))] })
            }
        
        return Dialog.EndOfTurn
    }

    async categoryWaterfallStep2(step) {
    let text = step.context.activity.value.msteams.displayText && step.context.activity.value.action || step.context.activity.text;
    text = text.toLowerCase();
    step.options.option=text;
    await step.context.sendActivity({ type: ActionTypes.Typing });
    try {
        if (text) {
            return await step.beginDialog('productWaterfall', step.options)
                
        }
    } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }
}

module.exports.categoryMain = categoryMain
module.exports.categoryWaterfall = categoryWaterfall