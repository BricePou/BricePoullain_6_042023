const Sauce = require("../models/sauces");

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //l'utilisateur met un like
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Sauce liked" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //L'utilisateur enlève sont like
      if (sauce.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Sauce unliked" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //l'utilisateur met un dislike
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.likes === -1
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Sauce disliked" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //l'utilisateur enleve sont dislike
      if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.likes === 0
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Sauce undisliked" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
