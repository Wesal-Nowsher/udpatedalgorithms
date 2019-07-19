import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style from './style';
// import CountUp from 'react-countup';
// import { MDBDataTable } from 'mdbreact';
// import Pagination from "react-js-pagination";
// import ReactTable from 'react-table';
// import Search from 'react-search';
import 'react-table/react-table.css';
import Table from "../customtable/TableComponent";
// import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from "react-csv";

import { Progress } from 'reactstrap';

class control extends Component{
    state={
        data:[],
        loading: false,
        filechoosen: true,
        width:0,
        headers:[],
        activePage: 15,
        itemonpage:20,
        alldatain:[],
        onetwo:[],
        onetwohandicap:[],
        faceface:[],
        facefacehandi:[],
        overunder:[],
        Allerrors:[],
        one2face:[],
        majorrevenue:[],
        minorrevenue:[],
        allother:[]
    }




    componentDidMount(){
        if(this.props.data.length > 0){
            this.setState({loading:true, filechoosen: false,});
            let {data}= this.props;
            let self= this;

            setTimeout(function () {
                let newdata=[...data];
                let strc=[];
                let nw={};
                let headers=[...newdata[0]];
                self.setState({headers: headers})
                newdata.map((items,index)=>{
                    if(index >0){
                        items.map((item,inde)=>{
                            nw[headers[inde]]= item;
                        });
                        strc.push({...nw});

                    }
                })
                // console.log("data", strc)
                let onentwo=[];
                let handicap=[];
                let faceaface=[];
                let handicapfaceaface=[];
                let plusmoins=[];
                let one2facecombine=[];
                let one2faceno=[];
                strc.map((item, index)=>{
                    if(index >0){
                        if(item["Pari"].includes("1 N 2")  && !item["Pari"].includes("Handicap")){
                            item["inlist"]=true;
                            item["index"]=index;
                            item["group"]="1n2";
                            item["blue"]="ok";
                            item["fav"]=false;
                            onentwo.push(item);
                        }
                        else if(item["Pari"].includes("1 N 2") && item["Pari"].includes("Handicap")){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            handicap.push(item)
                        }
                        else if(item["Pari"].includes("Face à Face") && !item["Pari"].includes("Handicap") ){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            faceaface.push(item)
                        }
                        else if(item["Pari"].includes("Face à Face") && item["Pari"].includes("Handicap") ){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            handicapfaceaface.push(item)
                        }
                        else if(item["Pari"].includes("Plus / Moins")){
                            item["group"]="plus/moins";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            plusmoins.push(item)
                        }
                        else{
                            item["inlist"]=false;
                            item["index"]=index;
                            item["group"]="ok";
                            item["blue"]="ok";
                            item["fav"]=false;
                        }
                    }
                })

                strc.map((ite)=>{
                    if(ite["Pari"].includes("1 N 2")  ){
                        one2facecombine.push(ite);
                    }
                    else if(ite["Pari"].includes("Face à Face")){
                        one2facecombine.push(ite)
                    }
                    else{
                        one2faceno.push(ite);
                    }
                })
                // Chiﬀre d’aﬀaires
                let includingvalues=["Ligue 1 Conforama","Domino’s Ligue", "Premier League","Liga Primera",
                    "Serie A", "Bundesliga 1", "NBA", "TOP 14"];
                let majorrev=[];
                let minorrev=[];
                one2facecombine.map((item)=>{
                    includingvalues.map((items)=>{
                        if(item["Chiﬀre d’aﬀaires"] !== ""){
                            if(item["Evénement"].toLowerCase().includes(items.toLowerCase()) &&  parseInt(item["Chiﬀre d’aﬀaires"]) > 3000){
                                item["blue"]="red";
                                majorrev.push(item);
                            }
                        }
                    });
                    if(!item["Evénement"].toLowerCase().includes(includingvalues[0].toLowerCase()) ||
                        !item["Evénement"].toLowerCase().includes(includingvalues[1].toLowerCase()) ||
                        !item["Evénement"].toLowerCase().includes(includingvalues[2].toLowerCase()) ||
                        !item["Evénement"].toLowerCase().includes(includingvalues[3].toLowerCase())||
                        !item["Evénement"].toLowerCase().includes(includingvalues[4].toLowerCase())||
                        !item["Evénement"].toLowerCase().includes(includingvalues[5].toLowerCase())||
                        !item["Evénement"].toLowerCase().includes(includingvalues[6].toLowerCase())||
                        !item["Evénement"].toLowerCase().includes(includingvalues[7].toLowerCase())
                    ){
                        if(parseInt(item["Chiﬀre d’aﬀaires"]) > 1000 ){
                            item["blue"]="red";
                            minorrev.push(item);
                        }
                    }
                });
                self.setState({majorrevenue: majorrev, minorrevenue:minorrev } );
                let allother=[];
                one2faceno.map((item)=>{
                        if(item["Chiﬀre d’aﬀaires"] > 500 ){
                            item["blue"]="red";
                            allother.push(item);
                        }
                });
                self.setState({allother:allother});

                // Chiﬀre d’aﬀaires


                //onentwo
                let ioneindex =0;
                let winner="";
                let aswholewinner="";
                let minimumion;
                // console.log("1 n 2 length",onentwo);
                while(ioneindex <= onentwo.length-4){

                    // minone


                    // console.log("  onentwo[ioneindex",  onentwo[ioneindex])
                    if(parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",","."))
                        && parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",","."))){
                        minimumion= ioneindex;
                    }
                    else if(parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",","."))
                        && parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",","."))){
                        minimumion= ioneindex+1;
                    }
                    else if( parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",","."))
                        && parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",","."))){
                        minimumion= ioneindex+2;
                    }
                    // minone

                    if(ioneindex <3){
                        aswholewinner=onentwo[minimumion]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                        onentwo[minimumion]["blue"]="green";
                    }

                    winner=onentwo[minimumion]["Paris/Pronostics"];
                    if(ioneindex >=3){
                        if(onentwo[ioneindex]["Evénement"] !== onentwo[ioneindex-1]["Evénement"]){
                            let newwinner;
                            // minone
                            if(parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",","."))
                                && parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindex;
                            }
                            else if(parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",","."))
                                && parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindex+1;
                            }
                            else if( parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",","."))
                                && parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindex+2;
                            }
                            // minone
                            onentwo[newwinner]["blue"]="green";
                            aswholewinner= onentwo[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");

                        }
                        else{
                            if(!aswholewinner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                    winner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                )
                            && winner !== "N"){
                                onentwo[minimumion]["blue"]= "red";

                            }
                        }
                    }
                    ioneindex =ioneindex +3;
                }

                onentwo.map((item)=>{
                    strc[item["index"]]= item;
                })

                self.setState({onetwo: onentwo});
                //onentwo

                //faceaface
                let ioneindexface =0;
                let winnerface="";
                let aswholewinnerface="";
                let minimumface;
                while(ioneindexface <= faceaface.length-3){

                    // min2
                    if(parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",","."))){
                        minimumface= ioneindexface;
                    }
                    else if(parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",","."))){
                        minimumface= ioneindexface+1;
                    }
                    // min2
                    if(ioneindexface <2){
                        aswholewinnerface=faceaface[minimumface]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                        faceaface[minimumface]["blue"]="green";
                    }
                    // console.log("minimum",minimumface,faceaface[minimumface]);
                    winnerface=faceaface[minimumface]["Paris/Pronostics"];
                    let newwinner;
                    let skip= false;
                    if(ioneindexface >=2){
                        if(faceaface[ioneindexface]["Evénement"] !== faceaface[ioneindexface-1]["Evénement"]){
                            // min2
                           if( faceaface[ioneindexface]["Cotes Dernière"] !== "" && faceaface[ioneindexface+1]["Cotes Dernière"] !== "") {


                            if(parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindexface;
                                // console.log("newwinner in if",newwinner,ioneindexface)
                            }
                            else if(parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindexface+1;
                                // console.log("newwinner in else if",newwinner,ioneindexface);
                            }
                            // min2
                            // console.log("newwinner", faceaface,ioneindexface,ioneindexface);
                            faceaface[newwinner]["blue"]="green";
                            aswholewinnerface= faceaface[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");
                               skip=false;
                        }
                        else{
                               skip=true
                           }
                        }
                        else if(skip=== false){
                            if(!aswholewinnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                    winnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                )
                            ){
                                faceaface[minimumface]["blue"]= "red";
                            }
                        }
                    }
                    ioneindexface =ioneindexface +2;
                }



                faceaface.map((item)=>{
                    strc[item["index"]]= item;
                })
                self.setState({faceface:faceaface});
                //faceaface
                //handicaps in 1 n2
                let index=0;
                let valuetocheck=0;
                while(index  <= handicap.length -4){
                    if(index<3){
                        valuetocheck=   handicap[index]["Cotes Dernière"].replace(",",".");
                    }
                    if(index >=3){
                        if(handicap[index]["Evénement"] !== handicap[index-1]["Evénement"] ){
                            valuetocheck =handicap[index]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicap[index]["Pari"] !== handicap[index-1]["Pari"]){
                            valuetocheck =handicap[index]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheck) < parseFloat(handicap[index]["Cotes Dernière"].replace(",","."))){
                                handicap[index]["blue"]= "red";

                            }
                            valuetocheck=   handicap[index]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    index=index+3;
                }
                let indexi=0;
                let valuetochecki=0;
                while(indexi  <= handicap.length -4){


                    if(indexi<3){
                        valuetochecki=handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexi >=3){
                        if(handicap[indexi]["Evénement"] !== handicap[indexi-1]["Evénement"] ){
                            valuetochecki =handicap[indexi+2]["Cotes Dernière"].replace(",",".");

                        }
                        else  if(handicap[indexi]["Pari"] !== handicap[indexi-1]["Pari"] ){
                            valuetochecki =handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetochecki) > parseFloat(handicap[indexi+2]["Cotes Dernière"].replace(",","."))){

                                handicap[indexi+2]["blue"]= "red";
                            }

                            valuetochecki=handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexi=indexi+3;
                }

                handicap.map((item)=>{

                    strc[item["index"]]= item;
                })
                self.setState({onetwohandicap:handicap});
                //handicap in 1n 2
                //handicapfaceaface
                let indexhandface=0;
                let valuetocheckhandface=0;
                while(indexhandface  <= handicapfaceaface.length -3){
                    if(indexhandface<2){
                        valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexhandface >=2){
                        if(handicapfaceaface[indexhandface]["Evénement"] !== handicapfaceaface[indexhandface-1]["Evénement"] ){
                            valuetocheckhandface =handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicapfaceaface[indexhandface]["Pari"] !== handicapfaceaface[indexhandface-1]["Pari"] ){
                            valuetocheckhandface =handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckhandface) < parseFloat(handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",","."))){
                                handicapfaceaface[indexhandface]["blue"]= "red";                                }
                            valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexhandface=indexhandface+2;
                }
                let indexihandface=0;
                let valuetocheckihandface=0;
                while(indexihandface  <= handicapfaceaface.length -3){
                    if(indexihandface<2){
                        valuetocheckihandface=handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexihandface >=2){
                        if(handicapfaceaface[indexihandface]["Evénement"] !== handicapfaceaface[indexihandface-1]["Evénement"] ){
                            valuetocheckihandface =handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicapfaceaface[indexihandface]["Pari"] !== handicapfaceaface[indexihandface-1]["Pari"] ){
                            valuetocheckihandface =handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckihandface) > parseFloat(handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",","."))){

                                handicapfaceaface[indexihandface+1]["blue"]= "red";
                            }
                            valuetocheckihandface=handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexihandface=indexihandface+2;
                }
                    // console.log("derniere");
                handicapfaceaface.map((item)=>{

                    strc[item["index"]]= item;
                })
                self.setState({facefacehandi:handicapfaceaface})
                //handicapfaceaface
                //plusmoins
                let indexplus=0;
                let valuetocheckplus=0;
                while(indexplus  <= plusmoins.length -3){
                    if(indexplus <3){
                        valuetocheckplus=   plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexplus >=3){
                        if(plusmoins[indexplus]["Evénement"] !== plusmoins[indexplus-1]["Evénement"] ){
                                valuetocheckplus =plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(plusmoins[indexplus]["Pari"] !== plusmoins[indexplus-1]["Pari"] ){
                            valuetocheckplus =plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckplus) > parseFloat(plusmoins[indexplus]["Cotes Dernière"].replace(",","."))){
                                plusmoins[indexplus]["blue"]= "red";
                            }
                            valuetocheckplus=   plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexplus=indexplus+2;
                }
                let indexiplus=0;
                let valuetocheckiplus=0;
                while(indexiplus  <= plusmoins.length -3){


                    if(indexiplus<3){
                        valuetocheckiplus = plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");

                    }

                    if(indexiplus >=3){
                        if(plusmoins[indexiplus]["Evénement"] !== plusmoins[indexiplus-1]["Evénement"] ){
                            valuetocheckiplus =plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");

                        }
                        else  if(plusmoins[indexiplus]["Pari"] !== plusmoins[indexiplus-1]["Pari"] ){
                            valuetocheckiplus =plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckiplus) < parseFloat(plusmoins[indexiplus+1]["Cotes Dernière"].replace(",","."))){
                                plusmoins[indexiplus+1]["blue"]= "red";
                            }

                            valuetocheckiplus = plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexiplus=indexiplus+2;
                }

                plusmoins.map((item)=>{

                    strc[item["index"]]= item;
                })
                // console.log("plusmoins", plusmoins)

                self.setState({overunder:plusmoins});
                // plusmoins


                // console.log(
                //     "pageinations",strc.length
                // )
                let errors=[];
                self.setState({data: strc,alldatain:strc,loading:false });
                strc.map((item)=>{
                    if(item["blue"]==="red"){
                        errors.push(item)
                    }
                })
                self.setState({Allerrors:errors});


            },1000);
        }

    }
    nitems(value){
        // console.log("wesal",value);
        this.setState({itemonpage:value});
    }

    search(value){
        let {data,alldatain}=this.state;
        if(value !== ""){
            let results=[];

            for(var i=0; i<alldatain.length; i++) {
                if(alldatain[i]["Pari"].toString().toLowerCase().indexOf(value)!=-1 ) {
                    results.push(alldatain[i]);
                }
            }
            this.setState({data:results,itemonpage:20});
            // console.log("data",data);
            // console.log("results",results);
            // console.log("vakl",value);
            results=[];
        }
        else{
            // console.log("looseall",alldatain);
            this.setState({data:alldatain,itemonpage:20});
        }
    }
    onetwo(){
        // console.log("onetwo",this.state.onetwo);
        let {onetwo}= this.state;
        let errors=[];
            onetwo.map((item)=>{
                if (item["blue"]==="red"){
                    errors.push(item);
                }
            })
        // console.log("onetwo erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No 1 N 2 errors found");
            this.setState({data: this.state.alldatain, itemonpage:20});
        }
    }
    reset(){
        this.setState({data: this.state.alldatain,itemonpage:20});
    }
    onetwohadni(){
        // console.log("onetwo",this.state.onetwohandicap);
        let {onetwohandicap}= this.state;
        let errors=[];
        onetwohandicap.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("onetwo erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No 1 N 2 handicap errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    faceaface(){
        let {faceface}= this.state;
        let errors=[];
        // console.log("faceaface", faceface.length)
        faceface.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No faceaface errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }
    }
    majorreven(){
        let {majorrevenue}= this.state;
        let errors=[];
        // console.log("faceaface", faceface.length)
        majorrevenue.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No Major Revenue errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    minoreven(){
        let {minorrevenue}= this.state;
        let errors=[];
        // console.log("faceaface", faceface.length)
        minorrevenue.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No Minor Revenue errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
     allother(){
        let {allother}= this.state;
        let errors=[];
        // console.log("faceaface", faceface.length)
         allother.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    facehandi(){
        let {facefacehandi}= this.state;
        let errors=[];
        console.log("facefacehandi", facefacehandi.length)
        facefacehandi.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("facefacehandi erros", errors)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No faceaface-handicap errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    overunder(){
        let {overunder}= this.state;
        let errors=[];
        // console.log("overunder", overunder.length)
        overunder.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        console.log("overunder erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
            else {
                this.setState({ itemonpage: 100});
            }
        }
        else{
            alert("No over-under errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }
    }
    render(){


        let {data,headers,Allerrors}= this.state;

        // console.log("headersdata",headers, data)
        // console.log("data at render",data);


        return(
            <div>
                <div className="starter-head" >
                    <div className="container-inside">
                        <div className="header">
                            <span className="header-text" >Contrôle WEB</span>
                        </div>
                        <div className="empty-space"></div>
                        <Link to="/" className="link1 link">
                            <div className="link-text">Accueil</div>
                        </Link>
                        <Link to="/importation" className="link2 link">
                            <div className="">Importation</div>
                        </Link>
                        <Link to="/control" className="link3  link">
                            <div className="">Contrôles</div>
                        </Link>
                    </div>
                </div>
                <div className="accuil-content" id="">
                    <div className="accuil">
                        <div className="accuil-inside">
                            <div className="accuil-text">

                                {
                                    this.state.filechoosen &&  <h2>No file has been choosen!</h2>
                                }
                                {
                                     this.state.loading===false &&
                                    <div className="container">
                                        <div className="row downloadrow">
                                            {
                                                Allerrors.length>0 && <div className="download"><CSVLink  filename={"Allerrors.csv"} data={Allerrors}><button type="button">Download All Errors<strong className="spanred"> <i className="fa fa-download"></i> {Allerrors.length}</strong> </button></CSVLink>
                                                </div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">

                                                <div className="row table-header">
                                                    <div className="col-sm-3 search-col button-col">
                                                        <button className="buttonok"  type="button" onClick={()=> this.reset()} > Reset </button>
                                                        <input type="text" placeholder="Search" onChange={(e) => this.search(e.target.value)} />
                                                    </div>
                                                    <div className="col-sm-9 button-col">
                                                     <div className="d-flex"><button className="button" type="button" onClick={()=> this.onetwo()}> 1 n 2</button><CSVLink  filename={"1n2errors.csv"} data={this.state.onetwo}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink></div>
                                                        <div className="d-flex"><button className="button" type="button" onClick={()=> this.onetwohadni()} > 1 n 2 Handicap </button><CSVLink  filename={"1n2handicaperrors.csv"} data={this.state.onetwohandicap}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink></div>
                                                        <div className="d-flex"><button className="button" type="button" onClick={()=> this.faceaface()}> face a face</button><CSVLink  filename={"faceafaceerrors.csv"} data={this.state.faceface}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink></div>
                                                        <div className="d-flex"><button className="button" type="button" onClick={()=> this.facehandi()}> face a face-Handicap</button><CSVLink  filename={"faceafacehandicaperrors.csv"} data={this.state.facefacehandi}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink></div>
                                                        <div className="d-flex"><button  className="button" type="button" onClick={()=> this.overunder()}> Plus / Moins </button><CSVLink  filename={"plusmoineroors.csv"} data={this.state.overunder}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink></div>
                                                    </div>
                                                    <div className="download-btn">
                                                        {
                                                            data.length>0 && <div>
                                                                <CSVLink  filename={"errors.csv"} data={data}><button type="button"><i className="fa fa-download"></i> </button></CSVLink>
                                                            </div>
                                                        }


                                                    </div>
                                                    {/*<div className="col-sm-3 per-page-col">*/}
                                                        {/*<label>item per page</label>*/}
                                                        {/*<select onChange={(e) => this.nitems(e.target.value)}>*/}
                                                            {/*<option value="20">20</option>*/}
                                                            {/*<option value="40">40</option>*/}
                                                        {/*</select>*/}
                                                    {/*</div>*/}
                                                </div>
                                                <div className="row chifree">
                                                    <button className="button" type="button" onClick={()=> this.majorreven()}>Major Revenue</button>
                                                    <CSVLink  filename={"majorrevenueerrors.csv"} data={this.state.majorrevenue}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink>
                                                     <button className="button ml-2" type="button" onClick={()=> this.minoreven()}>Minor Revenue</button>
                                                    <CSVLink  filename={"minorrevenueerrors.csv"} data={this.state.minorrevenue}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink>
                                                    <button className="button ml-2" type="button" onClick={()=> this.allother()}>All Event</button>
                                                    <CSVLink  filename={"allerrors.csv"} data={this.state.allother}><button className="button1" type="button"><i className="fa fa-download"></i> </button></CSVLink>
                                                </div>
                                                <Table head={headers} data={data} pageSize={this.state.itemonpage} />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    this.state.loading &&
                                    <div>
                                        <div className="loader">
                                        </div>

                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <Style/>
            </div>
        )
    }
}
export default control;