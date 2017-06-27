 const courseState = {
	"Y": "有效",
	"N": "失效"
}
const classState = {
	W:'准备开课',
	S:'开课',
	E:'结课',
	N:'无效'
}
const classState1 = {
	W:'无效',
	S:'无效',
	E:'无效',
	N:'启用'
}
const get_courseState={
	"N":"启用",
	"Y":"失效"
}
const get_sex ={
	"F":'女性',
	"M":'男性'
}
const get_managementState = {
	A:'在读',
	B:'旁听',
	C:'休学',
	D:'退学',
	E:'已毕业',
	F:'已结业'
}
const get_stuQualification = {
	A:'硕士及以上',
	B:'本科',
	C:'专科'
}
const get_testState = {
	A:'未发布',
	B:'预备',
	C:'进行中',
	D:'已结束'
}
export const courseStatus = function (type) {
	return courseState[type]
}
export const courseFilter = function(type){
	return get_courseState[type]
}
export const classStatus = function (type) {
	return classState[type]
}
export const sex = function(type){
	return get_sex[type]
}
export const managementState = function(type){
	return get_managementState[type]
}
export const classFilter = function(type){	
	return classState1[type]
}
export const normalTime=(time)=>{
	
	if(time&&parseInt(time).toString().length>4){
		
		var oDate=new Date();
		oDate.setTime(time);

		var y=oDate.getFullYear();
		var mm=oDate.getMonth()+1;
		var d=oDate.getDate();

		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();

		return y+'-'+mm+'-'+d+' '+h+':'+m+':'+s;
	}else{
		return time
	}
}
export const testState = function(type){
	return get_testState[type];
}