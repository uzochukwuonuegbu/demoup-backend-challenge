import Asset from './assets.model';
import AssetsCategories from './assetsCategories.model';
import Category from './categories.model';
import Collection from './collections.model';
import CollectionCategories from './collectionsCategories.model';

// Constructors.hasMany(Teams, {
//   foreignKey: "constructorId",
//   as: "teamsList"
// });
// Teams.belongsTo(Constructors, {
//   foreignKey: "constructorId",
//   as: "constructor"
// });

// Championships.hasMany(Teams, {
//   foreignKey: "championshipId",
//   as: "teamsList"
// });
// Teams.belongsTo(Championships, {
//   foreignKey: "championshipId",
//   as: "championship"
// });

export {
    Asset,
    Category,
    AssetsCategories,
    Collection,
    CollectionCategories
};