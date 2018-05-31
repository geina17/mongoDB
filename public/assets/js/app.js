$(document).ready(function(){
    //nav bar mobile slider
    $(".button-collapse").sideNav();

    //click listenter for form submission to add comment
    $('.add-comment-button').on('click',function(){
        //get id
        var artId =$(this).data('id');
        //url root for local host or heroku
        var baseURL = window.location.origin;
        //get form data by id
        var frmNme = 'form-add-'+artId;
        var frm =$('#'+frmNme);
        //ajax call to delte comment
        $.ajax({
            url:baseURL + '/add/comment/' +artId,
            type:'POST',
            data: frm.serialize(),
        }).done(function(){
            location.reload();
        });
        return false;
    });
    //click listener for form submission to delte a comment
    $('.delete-comment-button').on('click',function(){
        //get _id of comment to be deleted
        var commId = $(this).data('id');
        //url root 
        var baseURL = window.location.origin;
        //ajax call to delte comment
        $.ajax({
            url:baseURL+'/remove/comment/'+commId,
            type:"POST",
        }).done(function(){
            //refreash the widow after the call done
            location.reload();
        });
        return false;
    });
});