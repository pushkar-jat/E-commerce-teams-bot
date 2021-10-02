const config = require('../../config.json')

module.exports.cardToDisplay = (detail) => {
    try {
        // var length = serviceList.length;

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
        card['body'].push({
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "Image",
                                "url":  `${detail.productImage}`
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${detail.name}`,
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `${detail.price}`,
                                "wrap": true
                            },
                            {
                                "type": "Input.Number",
                                "placeholder": "1",
                                "label": "Quantity",
                                "id": "Quantity"
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "value": `${detail}`,
                                        "action":"Add to cart",
                                        "title": "Add to cart",
                                        "data": {
                                            "action": "Add to cart" ,
                                            "msteams": {
                                                "type": "messageBack",
                                                "displayText":  `${detail}`
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit", 
                                        "value": "Buy Now",
                                        "action":"Buy Now",
                                        "title": "Buy Now",
                                        "data": {
                                            "action": "Buy Now" ,
                                            "msteams": {
                                                "type": "messageBack",
                                                "displayText": `${detail._id}`
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.Submit", 
                        "value": "Click for more information",
                        "action":"Click for more information",
                        "title": "Click for more information"
                    }
                ]
            })
        return card
    } catch (error) {
        console.error(error);
        return config.errorMessage
    }

}