import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';

const HomeAbout = () => {
    return (
        <Container sx={{ my: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="subtitle1">
                    Learn more about who we are, our mission, and what we stand for.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Company Overview */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Who We Are
                        </Typography>
                        <Typography variant="body1">
                            GrocerGo is your one-stop solution for all grocery needs. We aim to provide high-quality
                            products at affordable prices, delivered straight to your doorstep. With a wide range of
                            products from fresh vegetables to household essentials, we ensure a seamless shopping
                            experience.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Mission */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography variant="body1">
                            Our mission is to simplify grocery shopping for our customers by providing a wide selection
                            of products at great prices, ensuring fast delivery, and maintaining high standards of
                            quality. We believe in sustainability and strive to work with local suppliers and organic
                            products whenever possible.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Meet Our Team
                </Typography>
                <Typography variant="body1">
                    A dedicated team of professionals working hard to make your experience the best.
                </Typography>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    {/* Team Members */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                                John Doe
                            </Typography>
                            <Typography variant="body2">CEO & Founder</Typography>
                            <Typography variant="body2">
                                John has over 20 years of experience in the retail industry and is passionate about
                                making grocery shopping easier for everyone.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                                Jane Smith
                            </Typography>
                            <Typography variant="body2">COO</Typography>
                            <Typography variant="body2">
                                Jane oversees the day-to-day operations and ensures everything runs smoothly.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                                Michael Lee
                            </Typography>
                            <Typography variant="body2">CTO</Typography>
                            <Typography variant="body2">
                                Michael leads the tech team, ensuring that our platform is always running at its best.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default HomeAbout;
