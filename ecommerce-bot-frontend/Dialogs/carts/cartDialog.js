const { ActionTypes, MessageFactory, TurnContext, CardFactory, ActivityTypes } = require('botbuilder')
const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus, ChoiceFactory, ListStyle } = require('botbuilder-dialogs')
const { ChoicePrompt } = require('botbuilder-dialogs')
const config = require('../../config.json')
const { cart } = require("./../../api/carts/cartApi")
const { getProductsId } = require("./../../api/product/productApi")
const { cardToDisplay } = require('../../Cards/carts/cartCard')
const { cardToDisplayPayment } = require('../../Cards/carts/cartPayment')
const { cardToDisplayPaymentProceed } = require('../../Cards/carts/cartPaymentProceed')

const  {userData} = require("../../api/login/loginApi")
// const {cartPaymentDialogMain,cartPaymentDialogWaterfall} = require("./cartPaymentDialog")
const {homeDialog,homeWaterfall}= require('../home/homeDialog')

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const cartWaterfall = 'cartWaterfall'

class cartMain extends ComponentDialog {
    constructor(userData, token) {
        super(cartWaterfall)

        this.userData = userData;
        this.token=token;
        // this.addDialog(new cartPaymentDialogMain(this.userData))
        this.addDialog(new homeDialog(this.userData))
        this.addDialog(new WaterfallDialog(cartWaterfall, [
            this.cartWaterfallStep1.bind(this),
            this.cartWaterfallStep2.bind(this),
            this.cartWaterfallStep3.bind(this),
            this.cartWaterfallStep4.bind(this) 

        ]))
        this.initialDialogId = cartWaterfall
    }

    async cartWaterfallStep1(step) {
        const data = cart(step);
        console.log(data);
        var cartProductId = step._info.options.msteams.displayText; 
        var productDetail =  await getProductsId(cartProductId);
        var orderDetails = {
            productDetails:productDetail,
            quantity:step._info.options.Quantity || 1,
            totalPrice:productDetail.price*(step._info.options.Quantity || 1)
        };
        // for (let i in data.orders) {
        //     for (let j in data.orders[i].product) {
        //         orders[j]._id = data.orders[i].product[i]._id;
        //         orders[j].productId = data.orders[i].product[i].productId;
        //         orders[j].quantity = data.orders[i].product[i].quantity;

        //     }
        // }
        // for (let i in orders) {
        //     orderDetails[i] = getProductsId(orders[i].productId);
        //     orderDetails.totalAmount = orderDetails[i].price * order[i].quantity;
        // }
        console.log(productDetail);
        
        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplay(orderDetails))] });
        step.options.data = orderDetails;
        return Dialog.EndOfTurn;
    }

    async cartWaterfallStep2(step) {
        // var addressData = userData(step.options.verify.token.userId);
        let text = step.context.activity.value.msteams.displayText && step.options.data || step.context.activity.text;
        // var orderData = {
        //         data:text,
        //         deleiveryCharge:100,
        //         address:addressData
        // };
        // await step.context.sendActivity({ type: ActionTypes.Typing });
        const data = cart(step);
        console.log(data);
        var cartProductId = step._info.options.msteams.displayText; 
        var productDetail =  await getProductsId(cartProductId);
        var orderDetails = {
            productDetails:productDetail,
            quantity:step._info.options.Quantity || 1,
            totalPrice:productDetail.price*(step._info.options.Quantity || 1)
        }; 
        if(text)
           {
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplayPayment(orderDetails))] });
            step.options.newdata=orderDetails;
          return Dialog.EndOfTurn 
            }
            else{
                await step.context.sendActivity("product purchasing process failed, please try again after few minutes");
                return await step.beginDialog('homeWaterfall',step);
            }
          
    }
    async cartWaterfallStep3(step) {
        // var addressData = userData(step.options.verify.token.userId);
        
        let text = step.context.activity.value.msteams.displayText && step.options.data || step.context.activity.text;
        var totalPayment = step._info.options.data.totalPrice + (step._info.options.data.totalPrice)/10 + 100;
        // await step.context.sendActivity({ type: ActionTypes.Typing });
         
        if(text)
           {
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToDisplayPaymentProceed(totalPayment))] });
          return Dialog.EndOfTurn 
            }
            else{
                await step.context.sendActivity("product purchasing process failed, please try again after few minutes");
                return await step.beginDialog('homeWaterfall',step);
            }
          
    }
    async cartWaterfallStep4(step) {
        // var addressData = userData(step.options.verify.token.userId);
        let text = step.context.activity.value  || step.context.activity.text;
        // var orderData = {
        //         data:text,
        //         deleiveryCharge:100,
        //         address:addressData
        // };
        // await step.context.sendActivity({ type: ActionTypes.Typing });
         
        if(text.otp== 12345)
           {
            await step.context.sendActivity("payment successfull");
            return await step.beginDialog('homeWaterfall',step);
            }
            else{
                await step.context.sendActivity("product purchasing process failed, please try again after few minutes");
                return await step.beginDialog('homeWaterfall',step);
            }
          
    }
}

module.exports.cartMain = cartMain
module.exports.cartWaterfall = cartWaterfall