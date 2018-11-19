
//Slider
$(document).ready(function(){
    if(window.location.href.indexOf('index') > -1){
        $('.bxslider').bxSlider({
            mode: 'fade',
            captions: false,
            slideWidth: 1200,        
            responsive: true
        });
    }
      //Posts
    if(window.location.href.indexOf('index')> -1){
        var posts = [
            {
                title: "Prueba de Título 1",
                date: 'Publicado el día ' + moment().day() + ' del mes de ' + moment().format("MMMM") + ' del año ' +  moment().format("YYYY"),
                content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit,lacus pellentesque risus aliquet odio hac. Magnis gravida sodales fames porta rutrum faucibus nisl fusce, urna curabitur suscipit nec sollicitudin nam curae, ultricies  imperdiet vestibulum leo duis nostra interdum. Orci massa dictum class nostra tellus cras velit mattis nec placerat, inceptos fusce congue ad et lobortis feugiat fermentum felis, tempus penatibus  montes hendrerit auctor purus commodo rutrum suspendisse.'
            },
            {
                title: "Prueba de Título 2",
                date: 'Publicado el día ' + moment().day() + ' del mes de ' + moment().format("MMMM") + ' del año ' +  moment().format("YYYY"),
                content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit,lacus pellentesque risus aliquet odio hac. Magnis gravida sodales fames porta rutrum faucibus nisl fusce, urna curabitur suscipit nec sollicitudin nam curae, ultricies  imperdiet vestibulum leo duis nostra interdum. Orci massa dictum class nostra tellus cras velit mattis nec placerat, inceptos fusce congue ad et lobortis feugiat fermentum felis, tempus penatibus  montes hendrerit auctor purus commodo rutrum suspendisse.'
            },
            {
                title: "Prueba de Título 3",
                date: 'Publicado el día ' + moment().day() + ' del mes de ' + moment().format("MMMM") + ' del año ' +  moment().format("YYYY"),
                content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit,lacus pellentesque risus aliquet odio hac. Magnis gravida sodales fames porta rutrum faucibus nisl fusce, urna curabitur suscipit nec sollicitudin nam curae, ultricies  imperdiet vestibulum leo duis nostra interdum. Orci massa dictum class nostra tellus cras velit mattis nec placerat, inceptos fusce congue ad et lobortis feugiat fermentum felis, tempus penatibus  montes hendrerit auctor purus commodo rutrum suspendisse.'
            },
            {
                title: "Prueba de Título 4",
                date: 'Publicado el día ' + moment().day() + ' del mes de ' + moment().format("MMMM") + ' del año ' +  moment().format("YYYY"),
                content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit,lacus pellentesque risus aliquet odio hac. Magnis gravida sodales fames porta rutrum faucibus nisl fusce, urna curabitur suscipit nec sollicitudin nam curae, ultricies  imperdiet vestibulum leo duis nostra interdum. Orci massa dictum class nostra tellus cras velit mattis nec placerat, inceptos fusce congue ad et lobortis feugiat fermentum felis, tempus penatibus  montes hendrerit auctor purus commodo rutrum suspendisse.'
            },
            {
                title: "Prueba de Título 5",
                date: 'Publicado el día ' + moment().day() + ' del mes de ' + moment().format("MMMM") + ' del año ' +  moment().format("YYYY"),
                content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit,lacus pellentesque risus aliquet odio hac. Magnis gravida sodales fames porta rutrum faucibus nisl fusce, urna curabitur suscipit nec sollicitudin nam curae, ultricies  imperdiet vestibulum leo duis nostra interdum. Orci massa dictum class nostra tellus cras velit mattis nec placerat, inceptos fusce congue ad et lobortis feugiat fermentum felis, tempus penatibus  montes hendrerit auctor purus commodo rutrum suspendisse.'
            }
        ];
    
        posts.forEach((item, index) => {
            var post = `
            <article class="post">
                <h2>${item.title}</h2>
                    <span class="date">${item.date}</span>
                        <p>${item.content}</p>
                    <a href="#" class="button-more">Leer más</a>
            </article>
            `;
            
            $("#posts").append(post);
        });
    }
    //selector de temas
    var theme = $("#theme");
    $("#to-green").click(function(){
        theme.attr("href", "css/green.css");
    });

    $("#to-blue").click(function(){
        theme.attr("href", "css/blue.css");
    });

    $("#to-red").click(function(){
        theme.attr("href", "css/red.css");
    });


    //Scroll up
    $('.go-up').click(function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 800);

        return false;
    });

    //Login localStorage

    $('#login form').submit(function(){
        var form_name = $('#form_name').val();
        localStorage.setItem("form_name", form_name);        
    })

    var form_name = localStorage.getItem("form_name");

    if(form_name != null && form_name != "undefined"){    
        var about_p = $("#about p");
        $("#about p").html("<strong>Bienvenido, " + form_name + "</strong> ");
        about_p.append("<a href='#' id='logout'>Cerrar Sesión</a>");
        $('#login').hide();

        $('#logout').click(function(){
            localStorage.clear();
            location.reload();
        });
    }

    if(window.location.href.indexOf('about') > -1){        
        $("#accordion-box").accordion();
    }

    if(window.location.href.indexOf('reloj') > -1){
        setInterval(function(){
            var watch = moment().format("hh:mm:ss");
            $("#watch").html(watch);
        }, 1000);
        
    }
    
});

