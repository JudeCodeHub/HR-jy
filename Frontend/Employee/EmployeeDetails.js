import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from 'react-native-paper';
import Profession from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Gender from 'react-native-vector-icons/Foundation';



export default function EmployeeDetails({route})
{
  
  
    const navigation=useNavigation();

    const {item}=route.params;
   console.log(item)
   
    

    const HandleDelete = async () => {
      try {
       
        const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/Employee/${item._id}`);
        const response2 = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/Attendance/${item._id}`);
        const response3 = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/Payment/${item._id}`);


        

    
 
        if (response.status &&response2.status &&response3.status === 200) {
         
          Alert.alert("Successfully Deleted ");
          navigation.navigate('Home'); 
        } else {
    
          Alert.alert('Employee not Deleted');
        }
      } catch (error) {
      
        console.error(error);
        Alert.alert('Internal Error');
      }
    };
    



    return(
        
      <LinearGradient colors={["#CAC8EC", "white"]} style={{flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      

       <View style={{ marginTop: 32,flexDirection: "row", justifyContent: "flex-start",alignItems: "center",padding:15,backgroundColor:'#66a4fd'}}>
          <Pressable onPress={() => navigation.navigate("Employee",item.HR)}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </Pressable>

          <Text style={{fontSize: 22,fontWeight: "600",color: "white",flex: 1,textAlign: "center",}}>{item.Name}'s Profile</Text>

          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.navigate('UpdateProfile', {item});
            }}>
            <Icon name="user-edit" size={24} color={'white'} />
          </TouchableOpacity>
        </View>

     

  
      
        <View style={{marginTop:280}} >
          
         
     
        <View style={{alignItems: 'center'}}>
          <Avatar.Image
            size={180}
            style={styles.avatar}
            
            source={{ uri: item.image }}
            
          />
        </View>

        <View style={{marginTop:-60}}>
          <Text style={styles.nameText}>{item.Name}</Text>
        </View>

        <View style={{marginTop: 20,borderRadius:10, marginHorizontal: 20,padding:10,backgroundColor:"white"}}>

        <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={[styles.infoIconCont, {backgroundColor: '#774BBC'}]}>
              <AntDesign name="idcard" size={24} color="white" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoSmall_Text}>Id</Text>
                <Text style={styles.infoLarge_Text}>
                  
                  {item._id == '' ||
                  item._id == undefined ||
                  item._id == null
                    ? ''
                    : item._id}
                </Text>
              </View>
            </View>
          </View>
         

          <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={[styles.infoIconCont, {backgroundColor: '#774BBC'}]}>
                <Gender
                  name="torsos-male-female"
                  size={26}
                  color="blue"
                  style={{color: 'white'}}
                />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoSmall_Text}>Gender</Text>
                <Text style={styles.infoLarge_Text}>
                  {item.gender == '' ||
                  item.gender == undefined ||
                  item.gender == null
                    ? ''
                    : item.gender}
                </Text>
              </View>
            </View>
          </View>



          <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={[styles.infoIconCont, {backgroundColor: '#774BBC'}]}>
              <Entypo name="email" size={24} color="white" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoSmall_Text}>Email</Text>
                <Text style={styles.infoLarge_Text}>
                  
                  {item.email == '' ||
                  item.email == undefined ||
                  item.email == null
                    ? ''
                    : item.email}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={[styles.infoIconCont, {backgroundColor: '#774BBC'}]}>
                <Profession name="profile" size={24} style={{color: 'white'}} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoSmall_Text}>Profession</Text>
                <Text style={styles.infoLarge_Text}>
                  
                  {item.Job == '' ||
                  item.Job == undefined ||
                  item.Job == null
                    ? ''
                    : item.Job}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={[styles.infoIconCont, {backgroundColor: '#774BBC'}]}>
              <AntDesign name="phone" size={24} color="white" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoSmall_Text}>Mobile</Text>
                <Text style={styles.infoLarge_Text}>
                  
                  {item.mobile == '' ||
                  item.mobile == undefined ||
                  item.mobile == null
                    ? ''
                    : item.mobile}
                </Text>
              </View>
            </View>

            <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={[styles.infoIconCont, {backgroundColor: '#774BBC'}]}>
              <AntDesign name="star" size={24} color="white" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoSmall_Text}>Rating</Text>
                <Text style={styles.infoLarge_Text}>
                  
                  {item.mobile == '' ||
                  item.mobile == undefined ||
                  item.mobile == null
                    ? ''
                    : item.rating}
                </Text>
              </View>
            </View>
          </View>

          </View>

         
        </View>
      
   

     
     

     <View style={{marginBottom:50}}>

     </View>

     <View style={{alignItems:'center',flexDirection:'row'} } >
     <Pressable onPress={()=>{ navigation.navigate('UpdateProfile', {item})}} style={{backgroundColor:"#66a4fd",justifyContent:"center",alignItems:"center",width:100,height:40,borderRadius:10,flex:1,margin:20}}>
        <View style={{justifyContent:"center"}}>
            <Text style={{color:"white"}}>Update</Text>
        </View>
     </Pressable>
     <Pressable onPress={()=>{HandleDelete()}} style={{backgroundColor:"#e0474c",justifyContent:"center",alignItems:"center",width:100,height:40,borderRadius:10,flex:1,margin:20}}>
        <View style={{justifyContent:"center"}}>
            <Text style={{color:"white"}}>Delete</Text>
        </View>
     </Pressable>


     </View>
     </View>



  </ScrollView>
       </LinearGradient>
       










       
    )
}


const styles = StyleSheet.create({
  editIcon: {
    zIndex: 1,
    color: 'white',
    position: 'absolute',
    right: 2,
    margin: 15,
  },
  backIcon: {
    zIndex: 1,
    color: 'white',
    position: 'absolute',
    left: 2,
    margin: 15,
  },
  avatar: {
    borderRadius: 91,
    marginTop: -250,
    //marginLeft: 105,
    backgroundColor: '',
    height: 182,
    width: 182,
    padding: 10,
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 420475
  nameText: {
    color: 'black',
    fontSize: 28,

    fontStyle: 'normal',
   
    fontWeight:"500",
    textAlign: 'center',
  },
  bookCountMain: {
    borderColor: '#b0b0b0',
    borderWidth: 1,
    marginTop: 18,
    marginHorizontal: 20,

    borderRadius: 20,
    flexDirection: 'row',
    width: '88%',
  },
  bookCount: {
    width: '50%',
    borderColor: '#b0b0b0',
    borderRightWidth: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCountNum: {
    color: '#5D01AA',
    fontSize: 34,
    fontWeight: '800',
  },
  bookCountText: {color: '#b3b3b3', fontSize: 14, fontWeight: '500'},
  infoMain: {
    marginTop: 10,
  },
  infoCont: {
    width: '100%',
    flexDirection: 'row',
  },
  infoIconCont: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,

    alignItems: 'center',
    elevation: -5,
    borderColor: 'black',
    backgroundColor: 'black',
  },

  infoText: {
    width: '80%',
    flexDirection: 'column',
    marginLeft: 25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
  },
  infoSmall_Text: {
    fontSize: 13,
    color: '#1D1A66',
    fontWeight: '500',
  },
  infoLarge_Text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  booksUploadedMain: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    marginTop: 20,
  },
  flatlistDiv: {
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  booksUploadedText: {
    fontSize: 26,
    color: 'black',
    fontWeight: '700',
    paddingLeft: 20,
    paddingBottom: 8,
  },
  booksUploadedCard: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 9,
    marginBottom: 9,

    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 3,
  },
  booksUploadedImgDiv: {
    width: '28%',
  },
  booksUploadedImg: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  cardMidDiv: {
    paddingHorizontal: 10,
    width: '55%',
    position: 'relative',
  },
  approvedText: {
    fontSize: 12,
    color: '#0d7313',
    fontWeight: '600',
    marginLeft: 5,
  },
  cardBookNameText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
    marginTop: 2,
  },
  cardBookAuthor: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    marginTop: 1,
  },
  cardRating: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  cardRatingCount: {
    fontSize: 14,
    marginTop: -2,
    paddingLeft: 4,
    color: '#303030',
  },
  cardEditDiv: {
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEditBtn: {
    height: 44,
    width: 44,
    backgroundColor: '#774BBC',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',

    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#f5a002',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    paddingHorizontal: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});
