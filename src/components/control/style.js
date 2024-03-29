import React from 'react';

export default () => (
    <style jsx="true">{`
* {
    background-size: cover;
    font-family: "Avenir", Helvetica, Arial, sans-serif;

}
.red{
color:red;
}
.green{
    color:green;
}
.starter-head{
    margin-top: 0px;
    height: 54px;
    padding-right: 0px;
    padding-left: 0px;
    transform: translateY(0px);
    background-color: rgb(151, 2, 10);
    border-color: rgb(151, 2, 10);
    transition: .2s cubic-bezier(.4,0,.2,1);
    color: #fff;
    z-index: 3;
    top: 0;
    left: 0;
    position: fixed;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    width: 100%;
    will-change: padding-left,padding-right;

}
.search-col{
    display:flex;
}
.button-col{
    display:flex;
    justify-content: space-between;
}
.button-col .buttonok{
       border: 1px solid;
  border-radius:10px;
    padding: 5px 20px;
    outline: none;

}

.button-col .button{
       border: 1px solid;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px 20px;
    outline: none;
    border-right: none;
}
.button-col .button1{
    border: 1px solid;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 5px 7px;
    outline: none;

}

.button-col button:hover, .download-btn button:hover{
    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.44, rgb(122,153,217)), color-stop(1, rgb(73,125,189)), color-stop(1, rgb(28,58,148)));
}
.download-btn{
    position: fixed;
    left: 2%;
    bottom: 35%;
}
.downloadrow .download button{
    padding: 5px 12px;
    border-radius: 10px;
    color: black;
}
.chifree {
    justify-content: flex-start!important;
    align-items:center!important;
    margin:25px 0px;
}
.chifree .button{
          border: 1px solid;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px 20px;
    outline: none;
    border-right: none;


}
.chifree .button1{
       border: 1px solid;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 5px 7px;
    outline: none;
    margin-left: 1%;

}
.spanred{
color:red;
padding-left:5px;
}

.downloadrow{
    justify-content: flex-start!important;
    padding-left: 1%;
    margin-bottom: 1%;
 }
.download-btn button{
    border: 1px solid;
    border-radius: 50%;
    font-size: 30px;
    width: 60px;
    height: 60px;
}
.search-col input{
    border: 1px solid;
    padding: 5px 10px;
    border-radius: 10px;
    outline: none;
    width: 70%;
        margin-left: 15px;
}

.ml-2{
margin-left:2%;}
.scrollbar
{
	background: #F5F5F5;
	overflow-x: auto;
	margin-bottom: 25px;
}
#style-7::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

#style-7::-webkit-scrollbar
{
	background-color: #F5F5F5;
}

#style-7::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-image: -webkit-gradient(linear,
									   right top,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
}
.per-page-col{
    display:flex;
    justify-content:flex-end;
}
.table-header{
    margin-bottom:10px;
        justify-content: flex-start!important;
}
.dataTables_wrapper{
    background:transparent;
}
.table-striped>tbody>tr:nth-of-type(even) {
    background-color: white;
}
.starter-head .container-inside{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 24px;
}
.starter-head .container-inside .header{
    display: flex;
    align-items: center;

}
.starter-head .container-inside .header .header-text{
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: .02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: #fff;
}
.starter-head .container-inside  .empty-space{
    -webkit-box-flex: 1!important;
    -ms-flex-positive: 1!important;
    flex-grow: 1!important;
}
.starter-head .container-inside .link{
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    height: 44px;
    padding: 0 32px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 2px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;

    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
     font-weight: 500;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 6px 8px;
    min-width: 88px;
    outline: 0;
    text-transform: uppercase;
    text-decoration: none;
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1),color 1ms;
    transition: .3s cubic-bezier(.25,.8,.5,1),color 1ms;
    position: relative;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.starter-head .container-inside .link div{
    font-weight:600;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: inherit;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
    transition: .3s cubic-bezier(.25,.8,.5,1);
    white-space: nowrap;
    width: inherit;
}
.accuil-content{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.accuil-content .accuil{
       padding: 0px 0px 0px;

    background-size: cover;

}
.accuil-content .accuil .accuil-inside{
    -webkit-transition: none;
    transition: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    max-width: 100%;
    padding-top: 6%;
}
.accuil-content .accuil .accuil-inside .accuil-text{
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
}
.accuil-content .accuil .accuil-inside .accuil-text h2{

}
th{
}
.table-bordered {
    border: 1px solid #ddd;
    overflow: scroll;
    display: inline-flex;
}
.row{
    display:flex;
    justify-content:center;
}
tr{
overflow-x:scroll
}

table {
    width: 1200px;
    max-width: 1192px;
    margin-bottom: 20px;
    min-width: 1200px;
    background-color:white;
}
td{
border:1px solid #ddd;
}
#myProgress {
  width: 100%;
  background-color: #ddd;
}

#myBar {
  width: 1%;
  height: 30px;
  background-color: #4CAF50;
}
label {
    display: inline-block;
    max-width: 400px;
    margin-bottom: 5px;
    font-weight: 700;
    color: white;
    display: inline-flex;
    align-items: center;
}
a{
    cursor:pointer;
}
tr:nth-child(1){

}
.form-control {
    display: block;
    margin-left: 16px;
    width: 200px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.dataTables_info{
    color:white;
    margin-top:5%;
}

        `}</style>
);
