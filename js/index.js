var appFiles = "https://script.google.com/macros/s/AKfycby8FMMIJQkm0lAqUzyP_epJiw1dP3JMZ8VdiTGHckpfEVpecs-N/exec";
var appBlogs = "https://script.google.com/macros/s/AKfycbwlmoiBY_Ip2lt5QICMmOhOnX_dCrAo4_YMsOLk3hmx5M-kihAT/exec";
var ListAllBlog = "https://script.google.com/macros/s/AKfycbyKzP6PVt8N7Z0lWbxzUk-DS2z2wtz4xRZGKpRRkOKLmsLWiUPK/exec";
var appFolders = "https://script.google.com/macros/s/AKfycbyH1kJBvD1jZ4HaHNUnZm-nQKvDkH_RLv_8JNbd9aL5Rxh3FBg/exec";
var appCourses = "https://script.google.com/macros/s/AKfycbwfrQ3eHLKBaOHf_2bQQLURDbbf9lQ9UKaSJYxq-4oHm0-zSdax/exec";
function edit(){
    $(location).attr('href', 'edit.html'+window.location.search);
};
function md2html(input_content) {


      preview = "";
      //content = input.value;
      content = input_content;
      //console.log(content);
      [preprocessed_content, parse_result, StringSet] = html_preprocessing(content);
      debug = StringSet;
      for(var i=0;i<StringSet.length;i++){
      switch(StringSet[i].property){
        case "markdown_input":{
          //console.log("markdown_input");
      //					console.log(StringSet[i].data);
          var html_results = markdown.toHTML(StringSet[i].data);
          preview += html_results;
          break;
        }
        case "system_cmd":{
          //console.log("system_cmd");
          break;
        }
        case "html":{
          //console.log("html");
      //					console.log(StringSet[i].data);
          preview += StringSet[i].data;

          break;
        }
        case "u2b":{
          preview += StringSet[i].data;
          break;
        }
        case "flowchart":{
					console.log(StringSet[i].data);
					tmp = StringSet[i].data;
					var diagram = flowchart.parse(tmp);
					$('#diagram').html('');
					diagram.drawSVG('diagram');

					preview += $('#diagram').html();
					break;
				}
      }
      }
      return preview;
}

$(document).ready(function(){
$('#diagram').hide();
$('#content').html("loading...");
var course_id = window.location.search.split("?")[1].split("=")[1];
         console.log(course_id);
         $.get(appCourses,

             {
                 CourseID:course_id,
                 "command":"commandGetCourse"
             },
           function (data) {
           //console.log("the result is :"+data);
             title = data.split('$$')[0];
             content = data.split('$$')[1];
             var html_content = md2html(content,html_content);
          //   console.log(html_content);
             $('#blog_title').html(title);
             $('#content').html(html_content);
           });
});
