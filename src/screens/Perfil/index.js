import { StyleSheet } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
export const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        flex: 1,
    },
    imgdiv:{
        width:'100%',
        height:200,
        alignItems:"center",
        marginTop:40
    },
    imgprofile:{
        width:'35%',
        height:'80%',
        objectFit:'cover',
        borderRadius:100
    },
    infor1:{
        gap:5,
        borderWidth:1,
        borderColor:color.gray4,
        padding:5,
        gap:10,
    },
    text1:{
        fontSize:22,
        color:color.gray3
    },
    text2:{
        fontSize:20,
        color:color.gray1,
        
    }
})