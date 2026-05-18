import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";


export default function CalculatePayroll({route}) {

  const{employee, attendanceID ,Payment,Totalpresnt,Totalhrs,Dates}=route.params;
   console.log(Payment,Dates)
  const navigation=useNavigation();

 

 
  
  

  async function execute() {
    const html = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                        color: #333;
                    }
                    h1 {
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #eaeaea;
                    }
                    .section-title {
                        font-weight: bold;
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>SALARY SLIP</h1>
                <table>
                    <tr>
                        <td><strong>Employee Name:</strong>${employee.Name}</td>
                        <td><strong>Employee ID:</strong> ${employee._id}</td>
                    </tr>
                    <tr>
                        <td><strong>Designation:</strong>${employee.Job}</td>
                        <td><strong>Department:</strong> IT</td>
                    </tr>
                    <tr>
                        <td><strong>Pay From:</strong>${Dates.startDate} </td>
                        <td><strong>Pay To:</strong>${Dates.endDate}</td>
                       
                    </tr>
                </table>
                
                <div class="section-title">Earnings:</div>
                <table>
                    <tr>
                        <td>Basic Salary</td>
                        <td>${Totalhrs*Payment[0].Basicsalary}</td>
                    </tr>
                    <tr>
                        <td>Cost Of living</td>
                        <td>${Payment[0].Costofliving}</td>
                    </tr>
                    <tr>
                        <td>Food Allowance</td>
                        <td>${Payment[0].Foodallowance}</td>
                    </tr>
                    <tr>
                        <td>Medical Allowance</td>
                        <td>${Payment[0].Medicalallowance}</td>
                    </tr>
                       <tr>
                        <td>Other Allowance</td>
                        <td>${Payment[0].Medicalallowance}</td>
                    </tr>
                    <tr>
                        <td><strong>Gross Salary</strong></td>
                        <td><strong>${Grosssalary()}</strong></td>
                    </tr>
                </table>
                
                <div class="section-title">Deductions:</div>
                <table>
                    <tr>
                        <td>EPF(8.33%)</td>
                        <td>${Grosssalary()*8.33/100}</td>
                    </tr>
                    <tr>
                        <td>EPS(3.67%)</td>
                        <td>${Grosssalary()*3.67/100}</td>
                    </tr>
                    <tr>
                        <td>Income Tax(1%)</td>
                        <td>${Grosssalary()/100}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Deductions</strong></td>
                        <td><strong>${(Grosssalary()/100+Grosssalary()*8.33/100+Grosssalary()*3.67/100)}</strong></td>
                    </tr>
                </table>
                
                <table>
                    <tr>
                        <td><strong>Net Salary</strong></td>
                        <td><strong>${Grosssalary()-(Grosssalary()/100+Grosssalary()*8.33/100+Grosssalary()*3.67/100)}</strong></td>
                    </tr>
                </table>
            </body>
        </html>
    `;
    const { uri } = await Print.printToFileAsync({ html});
  
    Sharing.shareAsync(uri);
  }


  const Grosssalary=()=>{

    //Calculate Basic Salary
    const Basicsalary=Totalhrs*Payment[0].Basicsalary
  
    const TotalAllowance=Payment[0].Costofliving+Payment[0].Foodallowance+Payment[0].Otherallowance+Payment[0].Otherallowance;
    const Gross=(Basicsalary+TotalAllowance).toFixed(2);
   
    return Gross ;
  }
 
  
  
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",       
          backgroundColor: "white",
          padding:10,
          
          
        }}
      >
        <Pressable style={{justifyContent:"center"}} onPress={()=>navigation.navigate("PayRoll")}>
        <Ionicons
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />

        </Pressable>
        
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><Text style={{fontSize:30,fontWeight:600,color:"#163D70"}}>Salary Slip</Text></View>
        
        


      </View>
      
      <ScrollView style={{margin:10}}>

      

      <View style={styles.Box}>
          <Text style={{fontSize:20,fontWeight:600,color:"#163D70",marginBottom:10}}>Basic Salary</Text>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Hourly Salary(LKR)</Text>
             <Text>{Payment[0].Basicsalary}</Text>
             

          </View>
          <View style={styles.InsideView}>
          <Text style={styles.InsideText}>Basic Salary(LKR)</Text>
          <Text style={{margin:2,fontSize:15,fontWeight:"500"}}>{(Totalhrs*Payment[0].Basicsalary).toFixed(2)}</Text>
             

          </View>

         

          <Text style={{fontSize:20,fontWeight:600,color:"#163D70",marginBottom:10}}>Allowance</Text>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Cost Of Living(LKR)</Text>
             <Text>{Payment[0].Costofliving}</Text>
          </View>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Food Allowance(LKR)</Text>
             <Text>{Payment[0].Foodallowance}</Text>
          </View>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Medical Allowance(LKR)</Text>
             <Text>{Payment[0].Medicalallowance}</Text>
          </View>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Other Allowance(LKR)</Text>
             <Text>{Payment[0].Otherallowance}</Text>
          </View>

          <View style={{ flexDirection:"row",
    justifyContent:"space-between",
    marginTop:10,
    backgroundColor:"white",
    borderRadius:10,
    }}>
             <Text style={{fontSize:20,fontWeight:600,color:"#163D70"}}>Gross Salary(LKR)</Text>
             <Text style={{margin:2,fontSize:15,fontWeight:"500"}}>{Grosssalary()}</Text>
           
          </View>
          
        </View>
       

        
          
  

  

        <View style={styles.Box}>
          <Text style={{fontSize:18,fontWeight:600,color:"#163D70"}}>Dedutions</Text>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Income Tax(1%)</Text>
             <Text>{Grosssalary()/100}</Text>
          </View>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>EPS(8.33%)</Text>
             <Text>{Grosssalary()*8.33/100}</Text>
          </View>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>EPF(3.67%)</Text>
             <Text>{Grosssalary()*3.67/100}</Text>
          </View>
         
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Total Dedutions(LKR)</Text>
             <Text style={styles.InsideText}>{(Grosssalary()/100+Grosssalary()*8.33/100+Grosssalary()*3.67/100).toFixed(2)}</Text>    
          </View>     
        </View>

       
        <View style={styles.Box}>
          <Text style={{fontSize:18,fontWeight:600,color:"#163D70"}}>Net Salary</Text>
          <View style={styles.InsideView}>
             <Text style={styles.InsideText}>Net Salary(LKR)</Text>
             <Text style={{fontWeight:"600",fontSize:18}}>{Grosssalary()-(Grosssalary()/100+Grosssalary()*8.33/100+Grosssalary()*3.67/100).toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity style={{padding:10,justifyContent:"center",alignItems:"center",backgroundColor:"#0072c1",marginBottom:100,marginTop:10,borderRadius:15} }onPress={()=>execute()}>
          <Text style={{fontSize:18,fontWeight:"500",color:"white"}}>Print and Share</Text>
        </TouchableOpacity>


    
      


      </ScrollView>

      
     
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
 
  },
  Box:
  {

    padding:15,
    backgroundColor:"white",
    borderRadius:10,
    marginTop:10,

  },

  InsideText:{
    fontSize:15,
    margin:2,
    fontWeight:"600",
    color:"#163D70"
  },

  InsideView:{
    flexDirection:"row",
    justifyContent:"space-between",
   padding:8,
    backgroundColor:"white",
    borderRadius:10

  },
  TextBold:{
    fontWeight:"600"

  }



});
