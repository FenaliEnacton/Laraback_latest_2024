import AntDesignI from 'react-native-vector-icons/AntDesign';
import EntypoI from 'react-native-vector-icons/Entypo';
import EvilIconsI from 'react-native-vector-icons/EvilIcons';
import FeatherI from 'react-native-vector-icons/Feather';
import FontAwesomeI from 'react-native-vector-icons/FontAwesome';
import FontAwesome5I from 'react-native-vector-icons/FontAwesome5';
import FoundationI from 'react-native-vector-icons/Foundation';
import IoniconsI from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons';
import OcticonsI from 'react-native-vector-icons/Octicons';
import SimpleLineIconsI from 'react-native-vector-icons/SimpleLineIcons';
import ZocialI from 'react-native-vector-icons/Zocial';
import React from 'react';

export const MaterialCommunityIcons = props => (
  <MaterialCommunityIconsI {...props} />
);
const SimpleLineIcons = props => <SimpleLineIconsI {...props} />;
const AntDesign = props => <AntDesignI {...props} />;
const MaterialIcons = props => <MaterialIconsI {...props} />;
const FontAwesome = props => <FontAwesomeI {...props} />;
const Foundation = props => <FoundationI {...props} />;
const EvilIcons = props => <EvilIconsI {...props} />;
const Ionicons = props => <IoniconsI {...props} />;
const Octicons = props => <OcticonsI {...props} />;
const Feather = props => <FeatherI {...props} />;
const Entypo = props => <EntypoI {...props} />;
const Zocial = props => <ZocialI {...props} />;
const FontAwesome5 = props => <FontAwesome5I {...props} />;

export default {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome,
  Foundation,
  EvilIcons,
  Ionicons,
  Octicons,
  Feather,
  Entypo,
  Zocial,
};

//OPTIMIZATION_TODO: after development remove unnecessary font file
