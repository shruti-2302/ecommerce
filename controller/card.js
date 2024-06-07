const validator = require('validator');
const Card = require('../module/card');

exports.addCard = async (req, res) => {
  
    function validateCardNumber(cardNumber) {
        const cleaned = ('' + cardNumber).replace(/\D/g, '');
        let sum = 0;
        let shouldDouble = false;
        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned.charAt(i), 10);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return (sum % 10) === 0;
    }

    const { cardType, cardHolderName, bankName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    try {
        // Check if all fields are provided
        if (!cardType || !cardHolderName  || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate card number format
        if (!validator.isNumeric(cardNumber.toString()) || cardNumber.toString().length !== 16) {
            return res.status(400).json({ message: 'Invalid number format. Must be 16 digits' });
        }

        // Validate CVV length
        if (!validator.isNumeric(cvv.toString()) || cvv.toString().length !== 3) {
            return res.status(400).json({ message: 'Invalid CVV format. Must be 3 digits' });
        }

        // Validate card number using Luhn algorithm
        const isValid = validateCardNumber(cardNumber);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid card number' });
        }

        // Format card number with hyphens
        const fcard = cardNumber.toString().match(/.{1,4}/g).join('-');
const newbankName = bankName || '-';

   const newCard = new Card({
            cardType,
            cardHolderName,
            bankName:newbankName,
            cardNumber: fcard,
            expiryMonth,
            expiryYear,
            cvv,
        });

        await newCard.save();
      //  req.io.emit('newCard', newCard);

 return res.status(201).json({ message: 'New card added successfully' });
//  sendNotification('new card added');
} catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const { cardId } = req.params;

        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        await Card.deleteOne();

        return res.json({ message: 'Card deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to delete card', error: err.message });
    }
};

exports.getCardList = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
