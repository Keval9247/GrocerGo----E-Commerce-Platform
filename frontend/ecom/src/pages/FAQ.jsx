import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "You can return items within 30 days of purchase for a full refund."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to select countries."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, we will send you an email with the tracking information."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and Apple Pay."
        },
        {
            question: "How can I contact customer service?",
            answer: "You can contact us via email at support@ecommerce.com or call us at (123) 456-7890."
        },
    ];

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
                <Accordion 
                    expanded={expanded === `panel${index}`} 
                    onChange={handleChange(`panel${index}`)} 
                    key={index}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography variant="h6" fontWeight="bold">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FAQ;
