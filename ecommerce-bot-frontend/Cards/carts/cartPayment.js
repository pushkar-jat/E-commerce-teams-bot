const config = require('../../config.json')

module.exports.cardToDisplayPayment = (data) => {
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
                                "type": "TextBlock",
                                "text": "Order Detail",
                                "wrap": true,
                                "separator": true
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
                                "type": `${data.productDetails.productImage}`
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${data.productDetails.name}`,
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
                                "text": `${data.totalPrice}`,
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
                                "text": `${data.quantity}`,
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
                                "text": "Delivery Address:",
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
                                "text": "data hidden",
                                "wrap": true,
                                "separator": true
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
                                "text": "Delivery Charges:",
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
                                "text": "100",
                                "wrap": true
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
                                "text": "GST & Tax:",
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
                                "text": `${data.totalPrice / 10}`,
                                "wrap": true
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
        ]
            
        }
return card
    } catch (error) {
        console.error(error);
        return config.errorMessage
    }

}