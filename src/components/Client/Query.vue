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
                <form>
                    <div class="row">
                        <div class="col-sm-12">
                            <h1>Query Form</h1>
                        </div>
                    </div>

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
                            <input type="submit" name="Send" class="button btn-default btn-lg " @click="sendQuery">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
                     



    <!-- <div class="divider"></div>
    <br><br>
    <br><br>
    <form class="col s12">
        <div class="row">
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">account_circle</i>
                <input v-model="firstname" id="first_name" type="text">
                <label class="active grey-text" for="first_name">First Name</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">account_circle</i>
                <input v-model="lastname" id="last_name" type="text" >
                <label class="active grey-text" for="last_name">Last Name</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">email</i>
                <input v-model="email" id="email" type="email">
                <label class="active grey-text" for="email">Email </label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">phone</i>
                <input v-model="phone" id="phone" type="tel" placeholder="+12-123-1234567">
                <label class="active grey-text" for="phone">Phone</label>
            </div>
        </div>
  
        <div class="row">
            <div class="input-field col s12 m12">
            <i class="material-icons prefix">mode_edit</i>
            <textarea  v-model="message" id="message" class="materialize-textarea grey-text" data-length=250></textarea>
            <label class="active grey-text" for="message">Message</label>
            </div>
        </div>
        <button @click="sendQuery" class="btn waves-effect waves-light grey">
            Send
            <i class="material-icons right">send</i>
        </button> 
    </form> -->

                <!--End Portfolio Section-->
    </div>
</template>

<script>

export default {
    name: 'Query',
    data(){
        return{
            firstname: null,
            lastname: null,
            email: null,
            phone: null,
            message: null
        }
    },
    methods:{
        sendQuery(){
            alert('Your Query Has Been Sent')
            this.$router.push({name:'Query'})
            console.log(this.firstname,this.lastname)
            console.log(this.email,this.phone)
            console.log(this.message)
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
