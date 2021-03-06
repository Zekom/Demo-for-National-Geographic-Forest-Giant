/*global define $ TweenMax Quad Quint TimelineMax d3 Quart TweenLite*/
/**
 *
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

define([], function (require) {

    var SectionMapElevation,
        UserEvent = require('app/events/UserEvent');
    
    SectionMapElevation = function () {

        var instance = this,
            Vars = require('app/vars');

        /**
         * show elevation chart
         */
         
        instance.show = function() {
            $('#elevation-graphic').empty(); //clear content
            
            function close() {
                UserEvent.POPUP_CLOSE.dispatch();        
            }

            $('#popup-elevation .popup-close').bind('click', close);
            $('#popup-elevation .popup-hit-area').bind('click', close);

            addSVGContent();

            if( Vars.highPerformance ) {
                TweenMax.set($('#popup-elevation'), {css: {display: 'block'}});
                TweenMax.set($('#popup-elevation .popup-box'), {css: {z: -600, rotationX: 90}});

                TweenMax.to($('#popup-elevation'), 0.3, {css: {opacity: 1}, ease: Quart.easeOut});
                TweenMax.to($('#popup-elevation .popup-box'), 0.5, {css: {z: 0, rotationX: 0}, ease: Quart.easeOut});
            
                TweenMax.set($('.elevation-label'), {css: {opacity: 0}});
                TweenMax.to($('.elevation-label'), 0.5, {css: {opacity: 1}, delay: 1});
            } else {
                $('#popup-elevation').transitionedOpen();
            }
        };
         
        function addSVGContent() {
            var svg,
                gradient,
                paths,
                path,
                highPerformance = Vars.highPerformance;
            
            //add svg
            svg = d3.select("#elevation-graphic").append("svg")
                .attr("width", '600')
                .attr("height", '433');

            //gradient
            gradient = svg.append('linearGradient')
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("id", "gradient")
                .attr("x1", "35.748")
                .attr("y1", "288.9482")
                .attr("x2", "643.8398")
                .attr("y2", "288.9482");

            gradient.append("stop")
                .attr("offset", "0.2209").attr("style", "stop-color: #A2C4AF");
            gradient.append("stop")
                .attr("offset", "0.7485").attr("style", "stop-color: #A2C4AF");
            gradient.append("stop")
                .attr("offset", "0.7923").attr("style", "stop-color: #ACBEAB");
            gradient.append("stop")
                .attr("offset", "0.861").attr("style", "stop-color: #B4BAA8");
            gradient.append("stop")
                .attr("offset", "1").attr("style", "stop-color: #B4BAA7");

            //paths
            paths = svg.append('g');
            //paths.attr('transform', 'translate(20, -40) scale(.8)');

            path = paths.append('path')
                .attr("fill-rule", "even-odd")
                .attr("clip-rule", "even-odd")
                .attr('fill', 'url(#gradient)')
            
            if( highPerformance ) {
                path = path
                        .attr('d', "M643.84,1202 582,1202 504,1202 414,1202 254,1202 181,1202 88,1202 35.748,1202 35.748,1202 643.84,1202")
                        .transition()
                        .duration(700);
            }
            path.attr('d', "M35.748,434.002H643.84v-65.03c-2.697-0.26-5.422-0.068-8.125-0.244c-3.016-0.199-5.492-0.79-8.371-1.582c-3.656-1.008-3.868-4.007-4.479-7.338c-0.266-1.44-0.381-3.485-2.026-3.947c-0.664-0.187-1.436-0.467-2.102-0.583c-0.229-0.04-0.732,0.688-0.93,0.598c-0.338-0.152-0.716-1.06-0.934-1.377c-0.308,0.499-0.62,1-0.93,1.496c-0.714-0.829-1.184-0.218-1.86-0.58c-0.601-0.323-0.961-0.934-1.614-1.254c-1.479-0.729-2.571-1.667-3.963-2.619c-2.571-1.761-5.256-3.537-7.678-5.568c-2.462-2.065-4.994-4.055-7.44-6.154c-2.104-1.808-4.535-3.865-6.954-5.228c-2.648-1.488-4.968-3.251-7.677-4.464c-3.416-1.527-4.474-3.902-5.542-7.261c-0.966-3.044-2.354-5.895-3.215-8.988c-0.924-3.312-1.517-6.708-2.233-10.067c-0.669-3.128-1.482-6.144-2.031-9.313c-1.727,0.226-1.601,3.955-1.857,5.309c-0.596-5.154-1.166-10.311-1.861-15.452c-0.312-2.289-0.711-4.563-0.989-6.857c-0.218-1.771,0.184-7.038-1.8-7.815c-0.938,3.37-1.622,6.784-2.787,10.083c-1.685-4.745-1.515-9.999-1.877-15.003c-0.411-5.698-0.627-11.295-1.842-16.877c-0.488,4.033-0.986,8.027-1.68,12.03c-0.635,3.687-0.126,7.896-2.042,11.145c-4.138-14.016-2.971-29.101-5.579-43.416c-0.165,1.664-0.33,3.325-0.496,4.986c-0.151,1.514,0.105,3.727-0.899,4.937c-1.675,2.026-1.819,7.091-2.325,9.663c-0.352-0.21-1.798-0.798-1.882-1.173c-0.271-1.173-0.538-2.346-0.803-3.52c-0.392-1.711-0.399-3.559-0.567-5.301c-0.404-4.238-0.851-8.469-1.307-12.699c-0.375-3.482-1.176-6.928-1.927-10.348c-0.364-1.656-1.073-2.942-1.33-4.692c-0.323-2.22-0.638-3.955-1.48-6.023c-0.478,2.511-0.884,4.787-1.857,7.141c-0.522-1.509-0.953-2.942-1.863-4.27c-1.068-1.564-1.263-2.869-1.861-4.711c-0.467-1.438-1.086-2.834-1.561-4.28c-0.476-1.452-2.189-1.601-3.084-2.984c-1.633-2.52-1.118-5.923-1.246-8.818c-0.197-4.33-0.389-8.655-0.58-12.979c-0.123-2.719-0.289-5.435-0.436-8.154c-0.124-2.294-0.25-4.587-0.373-6.881c-0.021-0.36,0.016-0.795,0.031-1.22c0.031-0.869,0.312-12.424-0.524-12.424c-0.281,0-1.024,11.513-1.394,12.424c-0.441,1.081-0.846,2.349-0.99,2.706c-0.637,1.572-0.482,3.853-0.671,5.527c-0.354,3.159-0.86,6.29-1.265,9.442c-0.672,5.256-1.152,10.542-1.861,15.793c-0.33,2.441-0.65,14.901-3.708,15.321c-0.614-5.238-1.233-10.474-1.86-15.709c-0.507,1.643-0.99,3.131-1.767,4.658c-0.388,0.761-1.377,3.624-2.097,1.451c-0.995-2.992-1.551-6.052-2.645-9.004c-0.423,2.49-0.853,4.981-1.226,7.479c-0.152,1.019-0.648,7.802-2.496,6.613c-1.139-0.732-1.614-6.81-1.84-7.97c-0.079-0.412-1.792-2.197-2.121-2.168c-1.488,0.126-2.496,0.672-3.149,1.955c-1.126,2.205-1.451,5.136-2.188,7.526c-0.809,2.614-1.417,5.241-2.061,7.902c-0.632,2.63-1.142,5.335-2.026,7.892c-0.979,2.834-2.627,4.997-4.277,7.463c-1.52-2.9-4.165-5.86-5.947-1.373c-1.268,3.188-2.199,6.469-3.026,9.796c-1.525,6.128-2.212,12.61-3.225,18.84c-1.152,7.085-2.262,14.179-3.43,21.259c-0.433,2.627-1.191,6.532-3.12,8.448c-2.771,2.753-3.548-4.141-3.973-6.099c-0.381-1.748-0.588-4.482-1.554-5.97c-0.323-0.501-1.677-1.737-1.79-2.189c-0.302-1.186-0.601-2.372-0.9-3.553c-0.459,0.861-2.233,4.475-2.889,1.753c-0.486-2.015-0.987-3.842-1.764-5.763c-4.419,2.774-5.718-9.022-6.157-11.332c-0.48-2.509-0.955-4.973-2.115-7.259c-1.286-2.532-1.417-5.225-1.808-8.001c-0.708-5.023-2.081-9.907-2.837-14.927c-0.144-0.939-0.9-1.656-1.039-2.551c-0.252-1.598-0.504-3.199-0.758-4.8c-0.373-2.37-0.729-4.748-1.094-7.12c-0.549,3.782-1.145,7.519-1.855,11.274c-0.312-2.029-0.622-4.06-0.932-6.088c-0.289,1.811-0.443,8.707-2.79,9.285c-1.079-3.055-1.412-6.073-1.861-9.285c-0.307,1.543-0.619,3.088-0.929,4.632c-0.578-0.302-1.212-0.475-1.861-0.52c-1.22-0.086-0.819-0.535-1.714,0.717c-0.926,1.304-1.304,3.632-1.821,5.167c-0.543,1.604-1.609,2.945-2.648,1.121c-0.816-1.438-0.914-3.354-1.254-4.965c-0.656,1.031-1.729,0.816-2.79,0.918c-0.971,0.092-0.53,1.165-1.391,0.189c-0.187-0.208-1.247-1.229-1.449-0.719c-0.275,0.701-0.551,1.396-0.824,2.097c-0.166,0.415-0.927,0.52-1.005,0.939c-0.304,1.585-0.609,3.173-0.911,4.758c-0.401-1.984-0.845-3.955-1.102-5.959c-0.255-1.989,0.118-5.561-1.688-6.876c-0.525,3.989-1.094,7.91-1.861,11.857c-1.858-0.41-1.653-5.031-1.908-6.603c-0.491-2.979-1.002-5.823-1.808-8.728c-1.149,8.18-3.519,16.05-5.06,24.18c-0.824,4.351-1.593,8.691-2.231,13.074c-0.569,3.905-1.028,7.98-2.934,11.473c-1.695-1.312-0.706-5.23-2.792-5.629c-0.606,1.233-1.202,2.467-1.79,3.708c-0.63,1.32-2.457-0.971-2.958-0.134c-0.572,0.96-1.339,2.604-2.695,2.575c-1.606-0.034-1.517-2.417-1.855-3.734c-1.241,6.463-2.188,12.638-2.774,19.209c-0.286,3.17-0.625,6.335-0.937,9.503c-0.236,2.398,0.139,7.046-1.871,8.694c-0.96-7.466-2.228-14.862-3.697-22.244c-1.457-7.327-1.651-14.825-3.74-22.028c-0.674,7.511-1.648,14.864-2.774,22.317c-0.401,2.64-1.262,20.667-3.737,20.779c-0.759-3.881-1.368-7.745-1.895-11.663c-0.606-4.537-1.575-8.574-2.755-12.972c-1.092,1.241-1.808,8.067-4.645,5.692c-0.31,1.05-0.619,2.102-0.932,3.152c-0.305-1.937-0.352-4.152-0.966-6.012c-0.194-0.58-0.517-2.632-1.134-2.727c-0.706-0.108-2.196,0.714-2.643-0.076c-0.96-1.685-0.955-4.622-2.451-5.687c-1.341-0.95-1.981,5.044-2.102,5.721c-1.365-0.53-1.291-2.383-2.79-2.559c-0.401,2.92-0.302,7.376-1.958,9.975c-0.423,0.662-0.84,1.315-1.294,1.955c-0.585,0.811-1.315,0.15-1.517,0.855c-0.661,2.304-0.9,3.858-2.666,1.231c-0.771,1.139-1.827,1.333-1.981,2.562c-0.26,2.057-0.517,4.112-0.779,6.167c-0.391,3.11-1.063,6.167-1.798,9.211c-0.352,1.454-0.512,2.96-0.756,4.435c-0.123,0.758-0.968,3.731-2.272,2.073c-1.155-1.464-2.464-1.06-3.251-2.496c-0.748-1.365-0.903-3.076-1.252-4.584c-0.588,1.677-1.194,3.32-1.86,4.968c-1.53-7.421-3.43-14.938-5.582-22.196c-1.05,3.643-1.905,7.309-2.808,10.985c-0.273,1.097-0.546,2.194-0.813,3.293c-0.152,0.614-1.296,1.06-1.808,1.567c-1.215,1.202-1.958,3.634-2.472,5.24c-1.199,3.769-2.38,7.537-4.186,11.072c-0.449,0.879-0.716,1.545-1.614,1.929c-0.685,0.294-0.863,2.328-1.057,3.018c-0.488,1.743-1.399,3.456-1.974,5.193c-0.564-0.693-0.966-0.619-1.619-0.257c-0.475,0.268-0.895-0.79-1.173-1.181c-0.58,0.735-1.499,2.225-2.183,0.981c-0.719-1.315-1.457-1.488-1.698,0.086c-0.401,2.635-0.792,5.265-1.123,7.91c-0.617,5.004-1.065,10.51-3.359,15.056c-2.084-1.176-2.937-5.506-3.58-7.642c-0.354-1.178-1.596-1.921-2.47-2.729c-0.934-0.858-1.044-2.443-1.391-3.64c-0.278,0.412-0.648,1.375-1.173,1.375c-0.68,0-1.178,0.173-1.616,0.782c-0.572-1.005-1.116-1.932-1.861-2.816c-1.546,3.186-1.85,6.855-2.787,10.277c-0.31-0.564-0.622-1.128-0.934-1.695c-0.567,1.283-0.96,2.291-1.197,3.664c-0.254,1.457-0.079,3.813-1.588,4.601c-0.929-3.341-1.845-6.685-2.792-10.02c-2.475,13.917-3.942,27.999-6.511,41.9c-0.509-2.457-1.034-4.761-1.861-7.128c-0.451,0.635-1.05,1.176-1.855,1.239c-0.312-2.076-0.622-4.149-0.932-6.228c-0.31,0.507-0.622,1.011-0.926,1.52c-1.315-2.884-1.449-5.905-1.863-9.043c-0.31,1.312-0.617,2.622-0.929,3.932c-1.921-0.158-2.467-6.703-2.785-8.249c-1.278,2.601-2.115,4.9-2.792,7.726c-0.312-0.417-0.622-0.84-0.929-1.257c-2.766,5.272-2.354,12.835-3.354,18.695c-0.501,2.934-0.837,5.915-1.467,8.823c-0.273,1.26-1.661,9.325-3.551,7.792c-0.409,1.695-0.84,3.386-1.173,5.1c-0.218,1.151-0.446,2.304-0.664,3.455c-0.037,0.189-1.632,0.768-1.882,0.932c-0.422-1.899-0.863-3.786-1.17-5.707c-0.299-1.879-0.273-6.414-2.545-3.314c-2.669-1.574-3.64-6.456-4.414-9.232c-0.918-3.307-1.328-6.8-2.097-10.156c-0.312,0.415-0.62,0.83-0.929,1.241c-0.735-2.328-1.315-4.626-1.863-7.007c-0.31,0.958-0.617,1.918-0.929,2.876c-0.31-0.412-0.617-0.827-0.929-1.239c-0.459,1.735-0.648,3.346-1.861,4.711c-1.283-1.559-2.049-3.047-2.79-4.913c-0.307,0.525-0.617,1.053-0.926,1.58c-0.979-1.509-1.273-3.352-2.325-4.753c-1.202-1.59-1.165-3.755-2.325-5.466c-0.312,1.289-0.619,2.58-0.929,3.868c-1.488-0.472-2.016-1.763-3.482-0.538c-0.837,0.703-1.113,2.577-1.367,3.666c-0.753,3.167-1.491,6.327-2.346,9.468c-0.662,2.407-2.286,4.811-5.133,4.811c-1.349,0-2.089,1.821-2.548,2.955c-0.317,0.782-0.525,1.624-0.785,2.427c-0.223,0.688-0.808,0.616-1.226,1.152c-0.884,1.151-1.367,2.462-2.173,3.655c-0.745,1.098-0.664,3.257-1.637,4.01c-1.289,0.995-1.834,2.391-2.478,3.85c-0.241,0.552-0.921,0.116-1.189,0.891c-0.249,0.74-0.604,1.498-0.764,2.264c-0.354,1.701-0.918,8.002-3.458,7.834c-0.583-0.037-0.719-0.826-1.168-1.131c-0.622-0.42-1.239-0.275-1.861-0.916c-0.976-1-1.412-3.125-1.86-4.391c-1.777,0.672-1.8,4.805-2.79,6.484c-0.31-2.422-0.617-4.842-0.929-7.264c-0.722,1.312-1.294,2.598-1.858,3.989c-1.832-3.895-2.548-8.265-3.167-12.505c-0.234-1.627-0.212-5.477-2.17-6.031c-1.947-0.545-2.732,3.693-3.031,4.722c-2.181-2.149-2.561,2.706-3.957,3.396c-1.407,0.695-1.845-0.535-2.457-1.656c-0.478-0.876-1.415-1.523-1.955-2.595c-0.897,1.638-1.462,3.427-2.461,4.997c-0.473,0.736-0.813,1.535-1.189,2.327c-0.32,0.672-1.43,1.354-1.926,1.976c-0.31-0.477-0.619-0.957-0.932-1.432c-1.273,1.768-2.144,3.195-3.719,0.773c-1.008,0.984-1.646,2.202-2.64,3.191c-0.231,0.229-1.008-0.617-1.769-0.131c-0.59,0.377-0.819,1.416-1.102,2.041c-0.588,1.278-1.388,2.322-2.617,3.01c-0.861,0.483-1.646,3.205-2.099,4.145c-0.312-1.643-0.622-3.285-0.929-4.929c-1.48,2.184-1.554,4.808-2.79,7.146c-0.312-0.716-0.619-1.438-0.932-2.154c-0.535,1.947-1.081,3.766-1.858,5.629c-0.788-0.509-1.052-1.146-1.399-1.965c-0.396-0.942-1.039-1.26-1.488-2.082c-1.023-1.867-1.315-3.75-1.764-5.836c-1.139,2.076-1.924,4.27-2.79,6.469c-0.422-0.725-0.861-1.154-1.619-1.414c-0.593-0.202-0.893-1.322-1.173-1.861c-0.446,2.189-0.685,3.969-1.858,5.832c-1.272,2.021-2.102,3.584-2.792,5.907c-0.543-1.436-1.074-2.69-1.855-4.011c-0.732,0.78-1.281,1.596-1.858,2.494c-0.284-0.861-0.449-2.311-1.076-2.969c-0.438-0.459-0.855-0.91-1.252-1.409c-0.716-0.911-0.478-0.171-1.393-0.396c-0.864-0.213-1.918-0.68-2.792-0.796c-0.942-0.128-0.727-0.651-1.394,0.241c-0.404,0.543-0.824,1.008-1.396,1.395c-0.737-1.967-1.942-4.271-3.251-1.205c-0.851,1.986-1.711,3.613-2.325,5.739c-1.268-0.368-1.273-1.876-2.548-1.792c-0.575,0.036-1.005-2.79-1.17-3.398c-0.512,1.705-1.034,3.366-1.671,5.027c-0.417,1.074-0.557,3.908-2.044,3.034c-0.438,2.089-0.578,3.978-1.861,5.692c-0.233-0.41-0.703-0.686-0.929-1.098c-0.47,0.734-1.003,1.123-1.861,0.919c0.223,0.052-2.11-1.616-1.958-1.315c-1.026-2.023-1.32-4.064-1.767-6.29c-0.701,2.042-1.758,7.337-3.957,8.288c0,0-5.703,1.629-8.125,1.868C46.353,433.795,41.021,434.002,35.748,434.002");

            path = paths.append('path')
                .attr('fill', '#f6812e')
                .attr('d', "M250.513,362.267c1.572-10.29,2.848-20.632,4.671-30.883c0.947,3.335,1.863,6.679,2.792,10.02c1.509-0.788,1.333-3.144,1.588-4.601c0.236-1.373,0.63-2.38,1.197-3.664c0.312,0.567,0.625,1.131,0.934,1.695c0.937-3.422,1.241-7.091,2.787-10.277c0.745,0.884,1.289,1.811,1.861,2.816c0.438-0.609,0.937-0.782,1.616-0.782c0.525,0,0.895-0.963,1.173-1.375c0.346,1.197,0.457,2.782,1.391,3.64c0.874,0.808,2.115,1.551,2.47,2.729c0.643,2.136,1.496,6.466,3.58,7.642c2.293-4.545,2.742-10.051,3.359-15.056c0.331-2.645,0.722-5.275,1.123-7.91c0.242-1.575,0.979-1.401,1.698-0.086c0.685,1.244,1.604-0.247,2.183-0.981c0.278,0.391,0.698,1.449,1.173,1.181c0.653-0.362,1.055-0.436,1.619,0.257c0.575-1.737,1.485-3.451,1.974-5.193c0.194-0.69,0.373-2.724,1.057-3.018c0.898-0.383,1.166-1.05,1.614-1.929c1.806-3.535,2.986-7.304,4.186-11.072c0.515-1.606,1.257-4.039,2.472-5.24c0.512-0.507,1.656-0.953,1.808-1.567c0.268-1.1,0.541-2.197,0.813-3.293c0.234-0.966,0.47-1.932,0.704-2.897l4.369-0.002c1.233,4.682,2.349,9.416,3.317,14.111c0.667-1.648,1.272-3.291,1.86-4.968c0.349,1.509,0.504,3.22,1.252,4.584c0.787,1.436,2.097,1.031,3.251,2.496c1.304,1.659,2.149-1.314,2.272-2.073c0.244-1.475,0.404-2.981,0.756-4.435c0.735-3.044,1.407-6.102,1.798-9.211c0.023-0.194,8.445-0.134,8.978-0.142c0.806-0.013,2.168-0.37,2.606,0.496c0.428,0.843,0.236,2.357,0.347,3.289c0.307,2.517,0.753,5.028,0.703,7.571c-0.026,1.286-0.493,2.585-0.677,3.855c-0.128,0.89-0.491,1.86-0.771,2.729c-0.283,0.892-0.546,1.638-0.677,2.569c-0.486,3.482-4.262,4.062-6.989,4.797c-2.598,0.703-5.018,1.125-7.692,1.125c-0.892,0-1.614-0.002-2.472,0.265c-1.853,0.588-3.782,1.097-5.608,1.769c-1.902,0.704-4.346,1.632-5.579,3.346c-0.735,1.023-0.882,2.436-1.231,3.559c-0.359,1.16-0.745,2.469-1.16,3.601c-0.546,1.482-1.653,3.034-2.457,4.417c-1.152,1.987-2.992,3.59-4.194,5.511c-0.596,0.958-1.236,1.782-1.748,2.753c-0.564,1.068-1.199,2.123-2.115,2.931c-2.188,1.932-4.668,3.627-6.718,5.71c-0.787,0.798-1.69,1.512-2.611,2.149c-1.435,0.997-3.128,1.839-4.668,2.682c-0.695,0.383-1.31,0.834-1.979,1.249c-1.299,0.811-2.617,1.506-4.034,2.028c-1.249,0.459-2.333,0.848-3.375,1.819c-0.821,0.769-1.53,1.661-2.343,2.438c-1.128,1.071-2.328,1.987-3.572,2.944c-0.454,0.344-0.934,0.627-1.375,0.987c-0.551,0.438-1.165,0.821-1.653,1.328c-0.37,0.38-0.467,1.079-0.845,1.391c-0.475,0.394-1.706,0.176-2.286,0.176C253.528,362.267,252.019,362.267,250.513,362.267z");

            if( highPerformance ) {
                path.attr('opacity', '0')
                    .transition()
                    .duration(800)
                    .ease('linear')
                    .delay(1000)
                    .attr('opacity', '1');
            }
            
            //lines
            arrowhead1 = paths.append('marker')
                .attr('id', 'arrowhead1')
                .attr('markerWidth', '14')
                .attr('markerHeight', '14')
                .attr('refX', '3')
                .attr('refY', '3.5');

            arrowhead1.append('polygon')
                .attr('fill', 'black')
                .attr('transform', 'scale(.5)')
                .attr('points', '0,13.929 12.062,6.965 0,0');

            arrowhead2 = paths.append('marker')
                .attr('id', 'arrowhead2')
                .attr('markerWidth', '14')
                .attr('markerHeight', '14')
                .attr('refX', '3')
                .attr('refY', '3.5');

            arrowhead2.append('polygon')
                .attr('fill', 'black')
                .attr('transform', 'scale(.5)')
                .attr('points', '12.062,0 0,6.964 12.062,13.929');

            path = paths.append('line')
                .attr('stroke', '#5A595A')
                .attr('stroke-width', '2')
                .attr('x1', '332.816')
                .attr('y1', '282.413')
                .attr('x2', '105.486')
                .attr('y2', '282.413');
                
            if( highPerformance ) {
                path.attr('opacity', '0')
                    .transition()
                    .duration(400)
                    .delay(800)
                    .attr('opacity', '1');
            }

            path = paths.append('line')
                .attr('stroke', '#5A595A')
                .attr('stroke-width', '2')
                .attr('x1', '256.851')
                .attr('y1', '362.314')
                .attr('x2', '91.019')
                .attr('y2', '362.314');
                
            if( highPerformance ) {
                path.attr('opacity', '0')
                    .transition()
                    .duration(400)
                    .delay(800)
                    .attr('opacity', '1');
            }

            path = paths.append('line')
                .attr('stroke', '#5A595A')
                .attr('stroke-width', '2')
                .attr('marker-end', 'url(#arrowhead2)')
                .attr('x1', '485.521')
                .attr('y1', '179.406')
                .attr('x2', '412.263')
                .attr('y2', '179.406');
                
            if( highPerformance ) {
                path.attr('opacity', '0')
                    .attr('transform', 'translate(10, 0)')
                    .transition()
                    .duration(400)
                    .delay(800)
                    .attr('opacity', '1')
                    .attr('transform', 'translate(0, 0)');
            }

            path = paths.append('line')
                .attr('stroke', '#5A595A')
                .attr('stroke-width', '2')
                .attr('marker-end', 'url(#arrowhead1)')
                .attr('x1', '545.222')
                .attr('y1', '179.406')
                .attr('x2', '566.067')
                .attr('y2', '179.406');
                
            if( highPerformance ) {
                path.attr('opacity', '0')
                    .attr('transform', 'translate(-10, 0)')
                    .transition()
                    .duration(400)
                    .delay(800)
                    .attr('opacity', '1')
                    .attr('transform', 'translate(0, 0)');
            }
            
            return svg;
        }
    };

	return new SectionMapElevation();
});
