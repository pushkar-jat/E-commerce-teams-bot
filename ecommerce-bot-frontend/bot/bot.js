// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, CardFactory, TurnContext } = require('botbuilder');

const config = require('../config.json');

const serviceList = require('../Cards/mainCard');

class DialogBot extends ActivityHandler {
    constructor(conversationState, userState, dialog) {

        super();
        if (!conversationState) throw new Error('ConversationState is required')
        if (!userState) throw new Error('UserState is required')
        if (!dialog) throw new Error('Dialog is required')

        this.conversationState = conversationState
        this.userState = userState
        this.dialog = dialog
        this.dialogState = this.conversationState.createProperty('DialogState');

        this.onMessage(async (context, next) => {
            this.addConversationReference(context.activity);

            await this.dialog.run(context, this.dialogState);

            await next();


        });

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity("Welcome In E-Commerce Bot");
            await context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.MainMenuServiceList))] });
            await next()
        });


    }
    async run(context) {

        await super.run(context);

        await this.conversationState.saveChanges(context, this);

        await this.userState.saveChanges(context, this);

    }
    addConversationReference(activity) {

        const conversationReference = TurnContext.getConversationReference(activity);

        conversationReference[activity.from.name] = conversationReference;

    }

}

module.exports.DialogBot = DialogBot;
