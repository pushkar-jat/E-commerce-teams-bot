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
                        "columns":  [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": `${serviceList[i].productImage}`,
                                        "separator": true,
                                        "size": "Small"
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.Submit", 
                                                "value": `${serviceList[i]._id}`,
                                                "action":`${serviceList[i]._id}`,
                                                "title": `${serviceList[i].name}`,
                                                "data": {
                                                    "action": `${serviceList[i]._id}`,
                                                    "msteams": {
                                                        "type": "messageBack",
                                                        "displayText": `${serviceList[i].name}`
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": `${serviceList[i].price}`,
                                        "height": "stretch",
                                        "fontType": "Monospace",
                                        "size": "Medium",
                                        "weight": "Bolder",
                                        "color": "Dark"
                                    },
                                    {
                                        "type": "ActionSet"
                                    }
                                ]
                            }
                        ],
                        "separator": true
                    
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