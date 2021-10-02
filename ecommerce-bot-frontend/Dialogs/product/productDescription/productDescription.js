const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../../config.json')
const { getProducts } = require('../../../api/product/productApi')

const {cardToDisplay} = require('../../../Cards/product/productDescriptionCard')


const { logInMain, logInWaterfall } = require('./../../login/loginDialog')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const productDescriptionWaterfall = 'productDescriptionWaterfall'

class productDescriptionMain extends ComponentDialog {
    constructor(userData) {
        super(productDescriptionWaterfall);

        this.userData = userData;

        
        this.addDialog(new logInMain(this.userData))

        this.addDialog(new WaterfallDialog(productDescriptionWaterfall, [
            this.productDescriptionWaterfallStep1.bind(this),
            this.productDescriptionWaterfallStep2.bind(this),
            this.productDescriptionWaterfallStep3.bind(this)
        ]))
        this.initialDialogId = productDescriptionWaterfall
    }

    async productDescriptionWaterfallStep1(step) {
    //     // console.log('getProducts in product = ',getProducts)
    //     const products = await getProducts()
    //     console.log(products);
        const details = step._info.options;
        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay(details))] })
        return Dialog.EndOfTurn
    }

    async productDescriptionWaterfallStep2(step) {
        let text = step.context.activity.value || step.context.activity.value.action || step.context.activity.text;


        await step.context.sendActivity({ type: ActionTypes.Typing });
        try {
            if (text.action === 'Add to cart') {
                return await step.beginDialog('logInWaterfall',text,step._info.options)
                }
            else if(text.action === 'Buy Now'){
                return await step.beginDialog('logInWaterfall',text, step._info.options)
            }
            
        } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }
    async productDescriptionWaterfallStep3(step) {
        let text = step.context.activity.value || step.context.activity.value.action || step.context.activity.text;


        await step.context.sendActivity({ type: ActionTypes.Typing });
        try {
            if (text) {
                return Dialog.EndOfTurn
                }
            
        } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }

}



module.exports.productDescriptionMain = productDescriptionMain
module.exports.productDescriptionWaterfall = productDescriptionWaterfall