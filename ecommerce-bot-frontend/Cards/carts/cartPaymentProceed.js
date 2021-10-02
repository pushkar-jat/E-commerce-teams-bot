const config = require('../../config.json')

module.exports.cardToDisplayPaymentProceed = (data) => {
    try { 
 
        var card = {
            "type": "AdaptiveCard",
            "version": "1.3",
            "body": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "E-Commerce Bot",
                                    "wrap": true,
                                    "separator": true
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": " "
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "ColumnSet",
                                    "columns": [
                                        {
                                            "type": "Column",
                                            "width": "stretch",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": "Total Payment",
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
                                                    "text": `${data}`,
                                                    "wrap": true
                                                }
                                            ]
                                        }
                                    ]
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
                                    "text": "UPI Payment Method",
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
                                    "text": "Enter UPI:",
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Input.Text",
                                    "placeholder": "UPI ID",
                                    "id": "upiid"
                                }
                            ]
                        }
                    ]
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
                                    "text": "Enter OTP:",
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Input.Number",
                                    "id": "otp",
                                    "placeholder": "type- 12345"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ActionSet",
                    "separator": true,
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Proceed To Pay",
                            "data": {
                                "action": "Proceed To Pay",
                                "msteams": {
                                    "type": "Proceed to buy",
                                    "displayText": "Proceed To Pay"
                                }
                            }
                        }
                    ]
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        }
return card
    } catch (error) {
        console.error(error);
        return config.errorMessage
    }

}