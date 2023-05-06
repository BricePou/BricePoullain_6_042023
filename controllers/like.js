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
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
                $pull: { usersDisliked: req.body.userId },
              };
            }
            Sauce.updateOne({ _id: req.params.id }, update)
              .then(() => res.status(201).json({ message: "Sauce liked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case -1:
          if (alreadyDisliked) {
            res.status(200).json({ message: "Already disliked" });
          } else {
            const update = {
              $inc: { likes: -1 },
              $push: { usersDisliked: req.body.userId },
            };

            if (alreadyLiked) {
              update = {
                $inc: { dislikes: -1 },
                $push: { usersDisliked: req.body.userId },
                $pull: { usersLiked: req.body.userId },
              };
            }
            Sauce.updateOne({ _id: req.params.id }, update)
              .then(() => res.status(201).json({ message: "Sauce disliked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0:
          if (alreadyLiked) {
            res.status(200).json({ message: "Already liked" });
          } else {
            const update = {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            };

            if (alreadyDisliked) {
              update = {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
                $pull: { usersDisliked: req.body.userId },
              };
            }
            Sauce.updateOne({ _id: req.params.id }, update)
              .then(() => res.status(201).json({ message: "Sauce liked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (alreadyDisliked) {
            res.status(200).json({ message: "Already disliked" });
          } else {
            const update = {
              $inc: { likes: -1 },
              $pull: { usersDisliked: req.body.userId },
            };

            if (alreadyLiked) {
              update = {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                $push: { usersLiked: req.body.userId },
              };
            }
            Sauce.updateOne({ _id: req.params.id }, update)
              .then(() => res.status(201).json({ message: "Sauce disliked" }))
              .catch((error) => res.status(400).json({ error }));
        }
          break;
          default:
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

// exports.likeSauce = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then((sauce) => {
//       //l'utilisateur met un like
//       if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
//         Sauce.updateOne(
//           { _id: req.params.id },
//           {
//             $inc: { likes: 1 },
//             $push: { usersLiked: req.body.userId },
//           }
//         )
//           .then(() => res.status(201).json({ message: "Sauce liked" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//       //L'utilisateur enlève sont like
//       if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
//         Sauce.updateOne(
//           { _id: req.params.id },
//           {
//             $inc: { likes: -1 },
//             $pull: { usersLiked: req.body.userId },
//           }
//         )
//           .then(() => res.status(201).json({ message: "Sauce unliked" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//       //l'utilisateur met un dislike
//       if (
//         !sauce.usersDisliked.includes(req.body.userId) &&
//         req.body.like === -1
//       ) {
//         Sauce.updateOne(
//           { _id: req.params.id },
//           {
//             $inc: { dislikes: 1 },
//             $push: { usersDisliked: req.body.userId },
//           }
//         )
//           .then(() => res.status(201).json({ message: "Sauce disliked" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//       //l'utilisateur enleve sont dislike
//       if (
//         sauce.usersDisliked.includes(req.body.userId) &&
//         req.body.like === 0
//       ) {
//         Sauce.updateOne(
//           { _id: req.params.id },
//           {
//             $inc: { dislikes: -1 },
//             $pull: { usersDisliked: req.body.userId },
//           }
//         )
//           .then(() => res.status(201).json({ message: "Sauce undisliked" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//     })
//     .catch((error) => res.status(404).json({ error }));
// };
