const config = require('../../config.json')

module.exports.cardToDisplay = (serviceList) => {
    try { 

        const length = serviceList.length;
        var card = {
            "type": "AdaptiveCard", 
            "version": "1.3",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "E-Commerce Bot",
                    "wrap": true,
                    "separator": true
                },
                {
                    "type": "TextBlock",
                    "text": "Cart",
                    "wrap": true,
                    "separator": true
                }
            ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
            // let i = 0;
            // for (i = 0; i < length; i++) {
            card['body'].push(
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": `${serviceList.productDetails.productImage}`,
                                    "size": "Small",
                                    "style": "Person"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${serviceList.productDetails.name}`,
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${serviceList.quantity}`,
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text":`${serviceList.productDetails.price}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Total Amount",
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${serviceList.totalPrice}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Proceed to buy",
                            "value": `${serviceList.productDetails}`,
                                                "action":`${serviceList.productDetails}`,
                                                "data": {
                                                    "action": `${serviceList.productDetails }`,
                                                    "msteams": {
                                                        "type": "Proceed to buy",
                                                        "displayText": `${serviceList.productDetails.name }`
                                                    }
                                                }
                              
                        }
                    ]
                }
            )
return card
    } catch (error) {
        console.error(error);
        return config.errorMessage
    }

}