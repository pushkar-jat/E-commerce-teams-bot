const config = require('../../config.json')

module.exports.cardToDisplay = (serviceList) => {
    try {
        var length = serviceList.length;

        var card = {
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {   
                    "type": "TextBlock",
                    "text": "E-Commerce Bot",
                    "horizontalAlignment": "Left",
                    "weight": "Bolder"
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        }
        let i = 0;
        for (i = 0; i < length; i++) {
            card['body'].push({
                "type": "Container",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.Submit",
                                                "title": `${serviceList[i].nameToDisplay}`,
                                                "value": `${serviceList[i].nameToDisplay}`,
                                                "action":`${serviceList[i].nameToDisplay}`,
                                                "data": {
                                                    "action": `${serviceList[i].nameToDisplay}`,
                                                    "msteams": {
                                                        "type": "messageBack",
                                                        "displayText": `${serviceList[i].nameToDisplay}`
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
                ]
            })
        }
        return card
    } catch (error) {
        console.error(error);
        return config.errorMessage
    }

}