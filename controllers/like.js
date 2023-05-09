const Sauce = require("../models/sauces");

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const alreadyLiked = sauce.usersLiked.includes(req.body.userId);
      const alreadyDisliked = sauce.usersDisliked.includes(req.body.userId);

      switch (req.body.like) {
        case 1:
          if (alreadyLiked) {
            res.status(200).json({ message: "Already liked" });
          } else {
            const update = {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId },
            };
            if (alreadyDisliked) {
              update = {
                $inc: { likes: 1, dislikes: -1 },
                $push: { usersLiked: req.body.userId },
                $pull: { usersDisliked: req.body.userId },
              };
            }
            Sauce.updateOne({ _id: req.params.id }, update)
              .then(() => res.status(200).json({ message: "Sauce liked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case -1:
          if (alreadyDisliked) {
            res.status(200).json({ message: "Already disliked" });
          } else {
            const update = {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
            };
            if (alreadyLiked) {
              update = {
                $inc: { dislikes: 1, likes: -1 },
                $push: { usersDisliked: req.body.userId },
                $pull: { usersLiked: req.body.userId },
              };
            }
            Sauce.updateOne({ _id: req.params.id }, update)
              .then(() => res.status(200).json({ message: "Sauce disliked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0:
          if (!alreadyLiked && !alreadyDisliked) {
            return res.status(200).json({ message: "never liked or disliked" });
          }
          let update = {};
          if (alreadyLiked) {
            update = {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            };
          }
          if (alreadyDisliked) {
            update = {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            };
          }
          Sauce.updateOne({ _id: req.params.id }, update)
            .then(() => res.status(200).json({ message: "Sauce liked reset" }))
            .catch((error) => res.status(400).json({ error }));
          break;
        default:
          res.status(422).json({ message: "like as invalid status" });
      }
    })
    .catch((error) => console.log(error));
};
