const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../config.json')
const { getProducts, getProductsId } = require('../../api/product/productApi')

const {getProductcategory } = require('../../api/category/categoryApi')

 

const { productDescriptionMain, productDescriptionWaterfall } = require('./productDescription/productDescription')

const { cardToDisplay}= require('../../Cards/product/productCard') 

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const productWaterfall = 'productWaterfall'

 
class productMain extends ComponentDialog {
        constructor(userData) {
            super(productWaterfall);
            
            this.userData = userData;
            this.addDialog(new productDescriptionMain(this.userData))
    
            this.addDialog(new WaterfallDialog(productWaterfall, [
                this.productWaterfallStep1.bind(this),
                this.productWaterfallStep2.bind(this)
            ]))
            this.initialDialogId = productWaterfall
        }
    async productWaterfallStep1(step) {
        // console.log('getProducts in product = ',getProducts)
        const products = await getProducts();
        var text = step.context.activity.value.msteams.displayText;
        text = text.toLowerCase();
        console.log(products);

        const data =  products;
        let data1 = [];
        if(step.options.text){
            for (let i in data.products) {
                if (data.products[i].category == text ) {
                data1.push({ ...data.products[i]});
                } 
            }
        }
        
        console.log(data1);   
        if(text.length > 1 && data1.length>0){ 
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay(data1))] })
        }
        else if(text.length >1 && data1.length==0){
            await step.context.sendActivity("select category is not found");
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay(products.products))] })
        }
        else{
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay(products.products))] })
        }
        return Dialog.EndOfTurn
    }

    async productWaterfallStep2(step) {
        let text = step.context.activity.value && step.context.activity.value.action || step.context.activity.text;


        await step.context.sendActivity({ type: ActionTypes.Typing });
        try { 
            if(1){
                const pDetail = await getProductsId(text);  
                return await step.beginDialog('productDescriptionWaterfall',pDetail, step.options)

            }       
        } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }
}



module.exports.productMain = productMain
module.exports.productWaterfall = productWaterfall
 

 