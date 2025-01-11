import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Button,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from '@mui/lab';
import React from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    height: '100%',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const AboutPage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4, mt: 12 }}>
            <HeroSection />
            <AboutSection />
            <MissionVisionSection />
            <CoreValuesSection />
            <HistorySection />
            <SustainabilitySection />
            <TeamSection />
            <AchievementsSection />
            <TechnologySection />
            <CommunityImpactSection />
            <TestimonialsSection />
            <PartnersSection />
            <FutureGoalsSection />
            <FAQSection value={value} handleChange={handleChange} />
            <CTASection />
        </Container>
    );
};

const HeroSection = () => (
    <Box
        sx={{
            textAlign: 'center',
            mb: 10,
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            py: 8,
            borderRadius: 4,
            color: '#fff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        }}
    >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
            About GrocerGo
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
            Revolutionizing Grocery Shopping Since 2020
        </Typography>
        <Button variant="contained" color="secondary" size="large" endIcon={<ArrowForwardIcon />}>
            Explore Our Story
        </Button>
    </Box>
);

const AboutSection = () => (
    <Grid container spacing={6} sx={{ mb: 12 }}>
        <Grid item xs={12} md={6}>
            <StyledPaper elevation={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                    Who We Are
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                    GrocerGo is more than just a grocery delivery service. We're a team of passionate individuals committed to transforming the way you shop for food. Our platform combines cutting-edge technology with a deep understanding of consumer needs to provide an unparalleled grocery shopping experience.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                    Founded in 2020, we've quickly grown to become a trusted name in online grocery shopping, serving thousands of satisfied customers across the nation. Our commitment to quality, convenience, and sustainability sets us apart in the competitive e-commerce landscape.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    At GrocerGo, we believe that everyone deserves access to fresh, high-quality groceries without the hassle of traditional shopping. Our innovative approach combines local sourcing, efficient logistics, and user-friendly technology to make grocery shopping a breeze.
                </Typography>
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
            <StyledPaper elevation={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component="img"
                    src="/placeholder.svg"
                    alt="GrocerGo team"
                    sx={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'cover', borderRadius: 2 }}
                />
            </StyledPaper>
        </Grid>
    </Grid>
);

const MissionVisionSection = () => (
    <Box sx={{ mb: 12 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Our Mission & Vision
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardHeader title="Our Mission" />
                    <CardContent>
                        <Typography variant="body1" paragraph>
                            To provide convenient, high-quality, and sustainable grocery solutions that enhance our customers' lives while supporting local communities and the environment.
                        </Typography>
                        <Typography variant="body1">
                            We strive to:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Deliver fresh, high-quality groceries to your doorstep" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Support local farmers and producers" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Minimize our environmental impact" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Provide exceptional customer service" />
                            </ListItem>
                        </List>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardHeader title="Our Vision" />
                    <CardContent>
                        <Typography variant="body1" paragraph>
                            To become the world's most trusted and innovative grocery platform, setting new standards in customer satisfaction, sustainability, and technological advancement in the industry.
                        </Typography>
                        <Typography variant="body1">
                            We envision a future where:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Every household has access to fresh, quality groceries" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Technology seamlessly integrates with daily grocery needs" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Sustainable practices are the norm in the grocery industry" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Local economies thrive through our partnerships" />
                            </ListItem>
                        </List>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    </Box>
);

const CoreValuesSection = () => {
    const values = [
        { title: 'Customer First', description: 'Every decision we make is with our customers in mind. We strive to exceed expectations and deliver delight in every interaction.' },
        {
            title: 'Innovation', description: "We constantly seek new ways to improve and revolutionize grocery shopping. Our team is dedicated to pushing the boundaries of what's possible."
        },
        {
            title: 'Sustainability', description: "We're committed to environmentally friendly practices in all aspects of our business, from sourcing to delivery."
        },
        { title: 'Quality', description: 'We never compromise on the quality of products and services we offer. Our customers deserve the best, and we deliver nothing less.' },
        { title: 'Integrity', description: 'Honesty and transparency are at the heart of everything we do. We build trust through ethical practices and open communication.' },
        { title: 'Community', description: 'We believe in giving back and supporting the communities we serve. Our success is intertwined with the well-being of our neighborhoods.' },
    ];

    return (
        <Box sx={{ mb: 12 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Our Core Values
            </Typography>
            <Grid container spacing={4}>
                {values.map((value, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <StyledCard>
                            <CardHeader title={value.title} />
                            <CardContent>
                                <Typography variant="body2">{value.description}</Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const HistorySection = () => (
    <Box sx={{ mb: 12 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Our Journey
        </Typography>
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    2020
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <WorkIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="span">
                        Founded
                    </Typography>
                    <Typography>GrocerGo launches in San Francisco</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    2021
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <BusinessIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="span">
                        Expansion
                    </Typography>
                    <Typography>Expanded to 5 major cities</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    2022
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        {/* <EcoIcon /> */}
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="span">
                        Sustainability Initiative
                    </Typography>
                    <Typography>Launched our eco-friendly packaging program</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    2023
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <SchoolIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="span">
                        AI Integration
                    </Typography>
                    <Typography>Introduced AI-powered personalized recommendations</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    2024
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <StarIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="span">
                        National Presence
                    </Typography>
                    <Typography>Now serving 50+ cities across the country</Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    </Box>
);

const SustainabilitySection = () => (
    <Box sx={{ mb: 12, bgcolor: 'primary.main', color: 'primary.contrastText', p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Sustainability at Our Core
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
            At GrocerGo, we believe that every small action can make a big difference. Our commitment to sustainability drives everything we do.
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                {/* <EcoIcon /> */}
                            </Avatar>
                        }
                        title="Eco-Friendly Packaging"
                    />
                    <CardContent>
                        <Typography variant="body2">
                            We use biodegradable and recyclable materials in our packaging to reduce waste and environmental impact. Our innovative packaging solutions have reduced plastic usage by 75% since 2021.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <LocalShippingIcon />
                            </Avatar>
                        }
                        title="Green Delivery Fleet"
                    />
                    <CardContent>
                        <Typography variant="body2">
                            Our delivery vehicles are transitioning to electric and hybrid models to minimize carbon emissions. By 2025, we aim to have 100% of our fleet running on clean energy.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <GroupIcon />
                            </Avatar>
                        }
                        title="Local Sourcing"
                    />
                    <CardContent>
                        <Typography variant="body2">
                            We prioritize partnerships with local farmers and producers to reduce transportation distances and support local economies. Over 60% of our produce comes from within a 100-mile radius of our distribution centers.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="secondary" size="large">
                Learn More About Our Sustainability Efforts
            </Button>
        </Box>
    </Box>
);

const TeamSection = () => {
    const teamMembers = [
        { name: 'Jane Doe', role: 'CEO & Co-Founder', image: '/placeholder.svg', bio: 'Jane brings 15 years of experience in e-commerce and a passion for sustainable business practices.' },
        { name: 'John Smith', role: 'CTO & Co-Founder', image: '/placeholder.svg', bio: 'John is a tech visionary with a track record of developing innovative solutions in the retail space.' },
        {
            name: 'Emily Brown', role: 'Head of Operations', image: '/placeholder.svg', bio: "Emily's expertise in logistics has been crucial in optimizing our delivery network across the country."
        },
        { name: 'Michael Lee', role: 'Head of Sustainability', image: '/placeholder.svg', bio: 'Michael leads our initiatives to minimize environmental impact and promote sustainable practices.' },
    ];

    return (
        <Box sx={{ mb: 12 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Meet Our Leadership Team
            </Typography>
            <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StyledCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Avatar
                                    src={member.image}
                                    alt={member.name}
                                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                                />
                                <Typography variant="h6" gutterBottom>
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                    {member.role}
                                </Typography>
                                <Typography variant="body2">
                                    {member.bio}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const AchievementsSection = () => {
    const achievements = [
        { year: 2021, title: 'Best Startup Award', description: 'Recognized as the Best E-commerce Startup by TechCrunch' },
        { year: 2022, title: 'Sustainability Excellence', description: 'Awarded for our eco-friendly initiatives by GreenBiz' },
        { year: 2023, title: '1 Million Customers', description: 'Reached the milestone of serving one million happy customers' },
        { year: 2024, title: 'Innovation in Retail', description: 'Received the Retail Innovation Award for our AI-powered platform' },
    ];

    return (
        <Box sx={{ mb: 12 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Our Achievements
            </Typography>
            <Grid container spacing={4}>
                {achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {achievement.year}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {achievement.title}
                                </Typography>
                                <Typography variant="body2">
                                    {achievement.description}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const TechnologySection = () => (
    <Box sx={{ mb: 12 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Powered by Innovation
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <StyledPaper elevation={4}>
                    <Typography variant="h5" gutterBottom color="primary">
                        Our Technology Stack
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At GrocerGo, we leverage cutting-edge technology to provide the best possible experience for our customers. Our platform is built on a robust and scalable architecture that enables us to handle thousands of orders efficiently.
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="AI-powered recommendation engine" secondary="Personalized shopping experiences for each customer" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Real-time inventory management" secondary="Accurate stock levels and reduced food waste" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Advanced route optimization" secondary="Efficient deliveries and reduced carbon footprint" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Blockchain for supply chain transparency" secondary="Ensuring product authenticity and traceability" />
                        </ListItem>
                    </List>
                </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledPaper elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src="/placeholder.svg"
                        alt="GrocerGo Technology"
                        sx={{ width: '100%', height: 'auto', maxHeight: 300, objectFit: 'contain' }}
                    />
                </StyledPaper>
            </Grid>
        </Grid>
    </Box>
);

const CommunityImpactSection = () => (
    <Box sx={{ mb: 12, bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Our Community Impact
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
            At GrocerGo, we believe in giving back to the communities we serve. Our impact goes beyond just delivering groceries.
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                    <CardHeader title="Food Donation Program" />
                    <CardContent>
                        <Typography variant="body2">
                            We've partnered with local food banks to donate over 100,000 meals to those in need. Our algorithm helps identify surplus food items that can be donated before they expire.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                    <CardHeader title="Education Initiatives" />
                    <CardContent>
                        <Typography variant="body2">
                            Our 'Tech for Good' program provides coding workshops and internships for underprivileged youth, helping to bridge the digital divide in our communities.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                    <CardHeader title="Local Business Support" />
                    <CardContent>
                        <Typography variant="body2">
                            We've helped over 500 local businesses expand their reach by featuring their products on our platform, contributing to local economic growth.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    </Box>
);

const TestimonialsSection = () => {
    const testimonials = [
        { text: "GrocerGo has completely transformed how I shop for groceries. The convenience, the product quality, and the delivery speed are unmatched!", author: "Sarah K., New York" },
        { text: "I love how GrocerGo emphasizes sustainability. Knowing that I'm supporting local farmers makes me feel great about my choices.", author: "Amit P., San Francisco" },
        { text: "The range of products available on GrocerGo is fantastic! I always find what I need and more. Their customer service is top-notch too!", author: "Lisa M., Chicago" },
        { text: "As a busy parent, GrocerGo has been a lifesaver. The time I save on grocery shopping allows me to spend more quality time with my family.", author: "Mark T., Boston" },
    ];

    return (
        <Box sx={{ mb: 12 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                What Our Customers Say
            </Typography>
            <Grid container spacing={4}>
                {testimonials.map((testimonial, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="body1" paragraph>
                                    "{testimonial.text}"
                                </Typography>
                                <Typography variant="subtitle2" align="right">
                                    - {testimonial.author}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const PartnersSection = () => {
    const partners = [
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
        '/placeholder.svg',
    ];

    return (
        <Box sx={{ mb: 12 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Our Partners
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
                We're proud to work with leading brands and local producers to bring you the best products.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {partners.map((partner, index) => (
                    <Grid item key={index}>
                        <Box
                            component="img"
                            src={partner}
                            alt={`Partner ${index + 1}`}
                            sx={{ height: 60, width: 'auto' }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const FutureGoalsSection = () => (
    <Box sx={{ mb: 12 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Looking Ahead: Our Future Goals
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardHeader title="Expanding Our Reach" />
                    <CardContent>
                        <Typography variant="body1">
                            We're committed to bringing GrocerGo to more cities across the country, ensuring that more people have access to convenient and sustainable grocery shopping. By 2026, we aim to be present in 100+ cities nationwide.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardHeader title="Innovating for the Future" />
                    <CardContent>
                        <Typography variant="body1">
                            We're investing in cutting-edge technologies like AI-powered recommendations and drone delivery to make your shopping experience even more seamless and efficient. Our R&D team is also exploring vertical farming solutions to bring ultra-fresh produce to urban areas.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardHeader title="Sustainability Leadership" />
                    <CardContent>
                        <Typography variant="body1">
                            We're setting ambitious targets to become carbon-neutral by 2030. This includes transitioning to 100% renewable energy in our operations, achieving zero-waste in our packaging, and implementing a comprehensive carbon offset program.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardHeader title="Community Empowerment" />
                    <CardContent>
                        <Typography variant="body1">
                            We're launching the GrocerGo Foundation to further our impact on local communities. The foundation will focus on food security, nutrition education, and supporting aspiring entrepreneurs in the food and tech industries.
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    </Box>
);

const FAQSection = ({ value, handleChange }) => {
    const faqs = [
        {
            question: "How does GrocerGo ensure the quality of its products?",
            answer: "We partner with trusted suppliers and implement strict quality control measures. Our team carefully inspects all products before they're delivered to ensure freshness and quality. We also have a cold chain management system to maintain the optimal temperature for perishable items throughout the delivery process."
        },
        {
            question: "What areas does GrocerGo currently serve?",
            answer: "We currently operate in major metropolitan areas across the United States. You can check if we deliver to your area by entering your zip code on our website or app. We're constantly expanding our service areas, so check back regularly if we're not in your area yet!"
        },
        {
            question: "How does GrocerGo support local farmers and producers?",
            answer: "We prioritize partnerships with local farmers and producers, featuring their products prominently on our platform and ensuring fair compensation for their goods. We also provide marketing support and data insights to help our local partners grow their businesses."
        },
        {
            question: "What measures does GrocerGo take to ensure food safety?",
            answer: "We adhere to strict food safety protocols, including temperature-controlled storage and transportation. Our staff is trained in proper food handling procedures to ensure the safety of all products. We also conduct regular audits of our facilities and processes to maintain the highest standards of food safety."
        },
        {
            question: "How does GrocerGo's subscription service work?",
            answer: "Our GrocerGo Prime subscription offers members free delivery, exclusive discounts, and early access to new products. Members also enjoy priority customer service and can accumulate points for additional savings. The subscription is billed monthly or annually, with a free trial period for new members."
        },
        {
            question: "What is GrocerGo's return policy?",
            answer: "We have a hassle-free return policy. If you're not satisfied with any product, you can request a refund or replacement within 7 days of delivery. For perishable items, we offer an even quicker resolution. Simply contact our customer service team, and we'll take care of it promptly."
        },
    ];

    return (
        <Box sx={{ mb: 12 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Frequently Asked Questions
            </Typography>
            <Tabs value={value}>
                <Tabs value={value} onChange={handleChange} centered>
                    {faqs.map((faq, index) => (
                        <Tab label={`Q${index + 1}`} key={index} />
                    ))}
                </Tabs>
                {faqs.map((faq, index) => (
                    <Box
                        role="tabpanel"
                        hidden={value !== index}
                        id={`faq-tabpanel-${index}`}
                        aria-labelledby={`faq-tab-${index}`}
                        key={index}
                        sx={{ mt: 2 }}
                    >
                        {value === index && (
                            <StyledPaper>
                                <Typography variant="h6" gutterBottom>{faq.question}</Typography>
                                <Typography variant="body1">{faq.answer}</Typography>
                            </StyledPaper>
                        )}
                    </Box>
                ))}
            </Tabs>
        </Box>
    );
};

const CTASection = () => (
    <Box sx={{ textAlign: 'center', bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 6, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Experience GrocerGo?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join thousands of satisfied customers who have transformed their grocery shopping experience with GrocerGo. Start enjoying fresh, quality groceries delivered to your doorstep today!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />}>
                Get Started
            </Button>
            <Button variant="outlined" color="inherit" size="large">
                Learn More
            </Button>
        </Box>
    </Box>
);

export default AboutPage;

