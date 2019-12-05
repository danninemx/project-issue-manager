import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    // card
    card: {
        maxWidth: 500
        // 345
        ,
        minWidth: '100%',
        // marginLeft: 240,
        marginTop: theme.spacing(1),
    },
    //   media: {
    //     height: 140,
    //   },

    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    // avatar (profile image)
    avatarRoot: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        display: 'inline-block',
        marginRight: theme.spacing(2),
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    target: {
        fontWeight: 'bold',
        color: 'red',
    }
}));

export default function CommentCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                /> */}
                <CardContent>
                    <div className={classes.avatarRoot}>
                        <div className={classes.avatarBlock}>
                            <Avatar alt="Danny K."
                                src="https://support.wwf.org.uk/sites/default/files/styles/attachment_image/public/benefit-images/lion_toy.jpg"
                                className={classes.avatar}
                            // display='inline-block'
                            >
                                Danny
                                </Avatar>
                            <Typography gutterBottom variant="h6" component="h2" display='inline'>Dan K.</Typography>
                        </div>
                        <div>
                            <Typography>12/15/2019 12:34 PM</Typography>
                        </div>
                    </div>
                    <Typography display='inline' variant="subtitle1" color="textSecondary" component="p">
                        Changed <span>XXXXXX</span> to <span className={classes.target}>YYYYYYY</span>.
                        </Typography>
                    <Typography display='inline' variant="subtitle2" color="textSecondary" component="p">{'\xa0\xa0'}(+3 other changes)</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                        <Button size="small" color="primary">
                            Share
                </Button>
                        <Button size="small" color="primary">
                            Learn More
                </Button>
                    </CardActions> */}
        </Card>


    );
}