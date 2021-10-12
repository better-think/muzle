import React, {useState, useEffect} from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { Grid, Card, CardActionArea, CardMedia, CardContent, CardActions, Button , Typography} from '@material-ui/core';
import axios from "axios";

const Index = () => {
    return ( 
        <AdminLayout title = "Home" >
            Home
        </AdminLayout>
    );
};


export default Index;