<template>
    <div id="query">
        <section class="testimonials padding-top-90 padding-bottom-90" id="testimonials">         
            <div class="container">
                <h1>Contact Us</h1>
            </div>
        </section>
         <!--Start Portfolio Section-->
    <section class="portfolio" id="portfolio">
    
        <div class="container">
            <div class="formBox">
                <form @submit.prevent="sendQuery">
                    <div class="row">
                        <div class="col-sm-12">
                            <h1>Query Form</h1>
                        </div>
                    </div>
                    <p v-if="feedback" class="red-text center-align">{{feedback}}</p>
                    <div class="row">
                        <div class="col-sm-6">
                            
                            <h2>First Name: </h2>
                            <div class="inputBox ">
                                <input v-model=firstname type="text" class="input" >
                            </div>
                            
                        </div>

                        <div class="col-sm-6">
                            <h2>Last Name: </h2>
                            <div class="inputBox ">
                                <input v-model=lastname type="text" class="input" >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Email: </h2>
                            <div class="inputBox ">
                                <input v-model=email type="text" class="input" >
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <h2>Phone: </h2>
                            <div class="inputBox ">
                                <input v-model=phone type="text" class="input" >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <h2>Message: </h2>
                            <div class="inputBox">
                                <textarea v-model=message class="input"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">

                        <div class="col-sm-12">
                            <input type="submit" name="Send" class="button btn-default btn-lg">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
import validate from '@/js_files/validation.js'
import firebase from 'firebase'
export default {
    name: 'Query',
    data(){
        return{
            firstname: null,
            lastname: null,
            email: null,
            phone: null,
            message: null,
            feedback : null,
        }
    },
    methods:{
        sendQuery(){
            this.feedback = validate.queryValidate(this.firstname+' '+this.lastname,this.email,this.phone,this.message)
            if(!this.feedback){
                let emailBody = 'Name : ' + this.firstname + ' ' + this.lastname + '\n\n' + 'Email: ' + this.email + '   Phone: ' + this.phone + '\n\n' + this.message
                var sendMail = firebase.functions().httpsCallable('sendMail');
                sendMail({body: emailBody, to: 'dilawer11@gmail.com', from: 'Surgical Fibre <noreply-surgicalfibre@surgicalfibre.com>'}).then(result=>{
                    alert('Your Query Has Been Recieved')
                    this.$router.push({name:'Query'})
                }).catch(err=>{
                    alert('Error: Your Query Was Not Sent')
                    console.log(err)
                    this.$router.push({name:'Query'})
                })
            }
        }
    }
}
</script>

<style>
.query{
    margin-top: 50px;
}
body{
	font-family: sans-serif;
}
.formBox{
	margin-top: 45px;
    margin-bottom: 80px;
}
.formBox  h1{
	text-align: center;
	margin-bottom: 50px;
	text-transform: uppercase;
	font-size: 40px;
}
.formBox  h2{
	font-size: 25px;
}
.inputBox{
	position: relative;
	box-sizing: border-box;
	margin-bottom: 50px;
}
.inputBox .inputText{
	position: absolute;
    font-size: 24px;
    line-height: 50px;
    transition: .5s;
    opacity: .5;
}
.inputBox .input{
	position: relative;
	width: 100%;
	height: 50px;
	background: transparent;
	border: none;
    outline: none;
    font-size: 15px;
    border-bottom: 1px solid rgba(0,0,0,.5);
}
.input:focus{
    border-bottom: 3px solid rgba(5, 79, 128, 0.5);

}
textarea{
	height: 100px !important;
}
.button{  
    background:rgba(3, 53, 94, 0.5);
    color: #fff;
}
</style>
