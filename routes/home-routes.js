const express = require('express');
const session = require('express-session');
const router = express.Router();
const { Tutors, Reviews, Users } = require('../models')

router.get('/homepage', async (req, res) => {
  try {

    const tutorData = await Tutors.findAll({
      attributes: ['tutors_name', 'id']
    });

    const tutors = tutorData.map((tutor) => tutor.get({ plain: true }));

    const reviewData = await Reviews.findAll({
      attributes: ['reviews_content']
    });
    
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render('homepage', {
      tutors,
      loggedIn: req.session.loggedIn
    });

   } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/homepage/:id', async (req, res) => {
  const tutorBtn = req.params.id;
  try {

    const tutorData = await Tutors.findAll({
      attributes: ['tutors_name', 'id'], 
      include: Reviews, 
        raw: true,
        nest: true 
      
    });
const matchedTutor = tutorData.filter(tutor => tutor.id == tutorBtn)
console.log("Matched", JSON.stringify(matchedTutor))
    const tutors = tutorData;
    console.log("TUTORS");
    tutors.forEach(tutor => {
      console.log(JSON.stringify(tutor))
    });
    
    const data = await Reviews.findAll({
      where: {
        id: tutorBtn,
      }
    })
    const reviews = matchedTutor.map(tutor => tutor.reviews);
    
    // Calculate the total rating by summing up tutors_rating values
    const totalRating = reviews.reduce((total, review) => total + review.tutors_rating, 0);
    
    // Calculate the average rating
    const numberOfReviews = reviews.length;
    const averageRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
    reviews.rating = averageRating;
    reviews.numberOfReviews = numberOfReviews;
    res.render('homepage', { tutors, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

router.get('/chat', async (req, res) => {
  const chatUsername = await Users.findByPk(req.session.user_id);
  const loggedUser = chatUsername.dataValues.users_name
  res.render('chat', { loggedUser });
});

router.get('/reviews', async (req, res) => {
  try {
    const reviewData = await Reviews.findAll({});
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    const last5Reviews = reviews.slice(-5); // This selects the last 5 reviews

    const tutorData = await Tutors.findAll({});
    const tutors = tutorData.map((tutor) => tutor.get({ plain: true }));



    console.log(last5Reviews);

    res.status(200).render('reviews', { reviews: last5Reviews, tutors });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;