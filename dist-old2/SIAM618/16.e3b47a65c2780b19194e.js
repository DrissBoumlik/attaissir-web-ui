(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{ZQdY:function(l,e,o){"use strict";o.r(e);var n=o("CcnG"),u=o("TVwl"),t=o("CoSo"),d=function(){function l(l,e){this._script=l,this.thirdsService=e}return l.prototype.ngOnInit=function(){var l,e,o,n,u,t,d,i=this;function a(l){return new Promise(function(e,o){var n=new XMLHttpRequest;n.open("POST",l),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.responseType="json",n.onload=function(){this.status>=200&&this.status<300?e(n.response):o({status:this.status,statusText:n.statusText})},n.onerror=function(){o({status:this.status,statusText:n.statusText})},n.send()})}function r(l){return(l<10?"0":"")+l}this.thirdsService.getStats().subscribe(function(l){i.tilesList=[{title:"Contrats confirm\xe9s",subTitle:"Nombre de contrats confirm\xe9s",value:l.actif+l.inactif,unit:"",icon:"flaticon-interface-5",url:"",backgroundColor:"",textColor:""},{title:"Contrats en cours",subTitle:"Nombre de contrats en cours",value:l.encours,unit:"",icon:"flaticon-interface-9",url:"",backgroundColor:"",textColor:""},{title:"Superficie contract\xe9e",subTitle:"Totale superficie contract\xe9e",value:l.sup_contracted+" (ha)",unit:"",icon:"flaticon-background",url:"",backgroundColor:"",textColor:""},{title:"Agr\xe9g\xe9s",subTitle:"Nombre des agr\xe9g\xe9s",value:l.aggregated,unit:"",icon:"flaticon-users",url:"",backgroundColor:"",textColor:""}]}),this.shortcutsList=[{title:"Ajouter un nouveau contrat d'agr\xe9gation",icon:"flaticon-interface-6",url:"/contrats/ajouter",color:""},{title:"Liste des cartes des agr\xe9g\xe9s",icon:"flaticon-tabs",url:"/cartes/liste",color:""}],(l="https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAakT7k-8wOIl2UDTZfVrFs-XjLdO9Gvyk",a(l)).then(function(l){return{lat:l.location.lat,lng:l.location.lng}}).then(function(l){return(e=l,a("http://api.openweathermap.org/data/2.5/weather?lat="+e.lat+"&lon="+e.lng+"&APPID=163f98f0d415aec0ceb630bc76fbdd1d&units=metric")).then(function(l){return l});var e}).then(function(l){var e,o;l.weather[0].main.toLowerCase(),e=l.name,document.getElementById("w-city").innerHTML=e,o=Math.round(l.main.temp),document.getElementById("w-temp").innerHTML=o}),e=document.getElementById("w-date-hour"),o=document.getElementById("w-day"),u=(n=new Date).getHours(),t=n.getMinutes(),n.getDate(),n.getMonth(),d=function(l){switch(d=n.getDay()){case 1:return"Lundi";case 2:return"Mardi";case 3:return"Mercredi";case 4:return"Jeudi";case 5:return"Vendredi";case 6:return"Samedi";default:return"Dimanche"}}(),e.innerHTML=r(u)+":"+r(t),o.innerHTML=d},l.prototype.ngAfterViewInit=function(){this._script.loadScripts("app-index",["assets/app/js/dashboard.js"])},l}(),i=o("58BA"),a=function(){},r=o("pMnS"),s=o("PS+O"),m=o("ZYCi"),p=o("BsMq"),c=o("Ip0R"),x=n["\u0275crt"]({encapsulation:2,styles:[],data:{}});function M(l){return n["\u0275vid"](0,[(l()(),n["\u0275eld"](0,0,null,null,8,"div",[["class","siam-dashboard-shortcuts-item"]],null,[[null,"click"]],function(l,e,o){var u=!0;return"click"===e&&(u=!1!==n["\u0275nov"](l,1).onClick()&&u),u},null,null)),n["\u0275did"](1,16384,null,0,m.n,[m.m,m.a,[8,null],n.Renderer2,n.ElementRef],{routerLink:[0,"routerLink"]},null),n["\u0275did"](2,81920,null,0,p.a,[n.ElementRef],{appPermissionHidden:[0,"appPermissionHidden"]},null),n["\u0275pad"](3,2),(l()(),n["\u0275eld"](4,0,null,null,2,"div",[["class","siam-dashboard-si-icon-wrapper"]],null,null,null,null,null)),(l()(),n["\u0275eld"](5,0,null,null,1,"div",[["class","siam-dashboard-si-icon"]],null,null,null,null,null)),(l()(),n["\u0275eld"](6,0,null,null,0,"i",[],[[8,"className",0]],null,null,null,null)),(l()(),n["\u0275eld"](7,0,null,null,1,"div",[["class","siam-dashboard-si-title"]],null,null,null,null,null)),(l()(),n["\u0275ted"](8,null,[" "," "]))],function(l,e){l(e,1,0,e.context.$implicit.url),l(e,2,0,l(e,3,0,"thirdParty.third-parties.store","thirdParty.third-parties.grid"))},function(l,e){l(e,6,0,n["\u0275inlineInterpolate"](1,"",e.context.$implicit.icon,"")),l(e,8,0,e.context.$implicit.title)})}function D(l){return n["\u0275vid"](0,[(l()(),n["\u0275eld"](0,0,null,null,12,"div",[["class","siam-dashboard-tiles-item"]],null,null,null,null,null)),n["\u0275did"](1,278528,null,0,c.NgStyle,[n.KeyValueDiffers,n.ElementRef,n.Renderer2],{ngStyle:[0,"ngStyle"]},null),n["\u0275pod"](2,{"background-color":0,color:1}),n["\u0275did"](3,81920,null,0,p.a,[n.ElementRef],{appPermissionHidden:[0,"appPermissionHidden"]},null),n["\u0275pad"](4,1),(l()(),n["\u0275eld"](5,0,null,null,1,"div",[["class","siam-dashboard-tiles-item-icon"]],null,null,null,null,null)),(l()(),n["\u0275eld"](6,0,null,null,0,"i",[],[[8,"className",0]],null,null,null,null)),(l()(),n["\u0275eld"](7,0,null,null,1,"div",[["class","siam-dashboard-tiles-item-value"]],null,null,null,null,null)),(l()(),n["\u0275ted"](8,null,[" "," "])),(l()(),n["\u0275eld"](9,0,null,null,1,"div",[["class","siam-dashboard-tiles-item-title"]],null,null,null,null,null)),(l()(),n["\u0275ted"](10,null,[" "," "])),(l()(),n["\u0275eld"](11,0,null,null,1,"div",[["class","siam-dashboard-tiles-item-subtitle"]],null,null,null,null,null)),(l()(),n["\u0275ted"](12,null,[" "," "]))],function(l,e){l(e,1,0,l(e,2,0,e.context.$implicit.backgroundColor,e.context.$implicit.textColor)),l(e,3,0,l(e,4,0,"agreement.contracts.grid"))},function(l,e){l(e,6,0,n["\u0275inlineInterpolate"](1,"",e.context.$implicit.icon,"")),l(e,8,0,e.context.$implicit.value),l(e,10,0,e.context.$implicit.title),l(e,12,0,e.context.$implicit.subTitle)})}function f(l){return n["\u0275vid"](0,[(l()(),n["\u0275eld"](0,0,null,null,20,"div",[["class","siam-dashboard-intro"]],null,null,null,null,null)),(l()(),n["\u0275eld"](1,0,null,null,16,"div",[["class","row"]],null,null,null,null,null)),(l()(),n["\u0275eld"](2,0,null,null,5,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),n["\u0275eld"](3,0,null,null,4,"div",[["class","siam-dashboard-intro-wm"]],null,null,null,null,null)),(l()(),n["\u0275eld"](4,0,null,null,1,"h2",[["class","siam-dashboard-intro-wm-title"]],null,null,null,null,null)),(l()(),n["\u0275ted"](-1,null,[" Bienvenue dans Attaissir "])),(l()(),n["\u0275eld"](6,0,null,null,1,"h1",[["class","siam-dashboard-intro-wm-subtitle"]],null,null,null,null,null)),(l()(),n["\u0275ted"](-1,null,[" Tout commence ici. "])),(l()(),n["\u0275eld"](8,0,null,null,1,"div",[["class","col-md-3"]],null,null,null,null,null)),(l()(),n["\u0275eld"](9,0,null,null,0,"img",[["alt",""],["src","/assets/images/logo_cosumar.png"],["style","z-index: 9999999"],["width","70%"]],null,null,null,null,null)),(l()(),n["\u0275eld"](10,0,null,null,7,"div",[["class","col-md-3"]],null,null,null,null,null)),(l()(),n["\u0275eld"](11,0,null,null,6,"div",[["class","weather-widget"]],null,null,null,null,null)),(l()(),n["\u0275eld"](12,0,null,null,0,"div",[["class","weather-widget-city"],["id","w-city"]],null,null,null,null,null)),(l()(),n["\u0275eld"](13,0,null,null,3,"div",[["class","weather-widget-date"]],null,null,null,null,null)),(l()(),n["\u0275eld"](14,0,null,null,0,"span",[["id","w-day"]],null,null,null,null,null)),(l()(),n["\u0275ted"](-1,null,["\xa0 "])),(l()(),n["\u0275eld"](16,0,null,null,0,"span",[["id","w-date-hour"]],null,null,null,null,null)),(l()(),n["\u0275eld"](17,0,null,null,0,"div",[["class","weather-widget-temp"],["id","w-temp"]],null,null,null,null,null)),(l()(),n["\u0275eld"](18,0,null,null,2,"div",[["class","siam-dashboard-shortcuts"]],null,null,null,null,null)),(l()(),n["\u0275and"](16777216,null,null,1,null,M)),n["\u0275did"](20,278528,null,0,c.NgForOf,[n.ViewContainerRef,n.TemplateRef,n.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),n["\u0275eld"](21,0,null,null,2,"div",[["class","siam-dashboard-tiles"]],null,null,null,null,null)),(l()(),n["\u0275and"](16777216,null,null,1,null,D)),n["\u0275did"](23,278528,null,0,c.NgForOf,[n.ViewContainerRef,n.TemplateRef,n.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),n["\u0275eld"](24,0,null,null,0,"div",[["class","m-content"]],null,null,null,null,null))],function(l,e){var o=e.component;l(e,20,0,o.shortcutsList),l(e,23,0,o.tilesList)},null)}var g=n["\u0275ccf"]("app-index",d,function(l){return n["\u0275vid"](0,[(l()(),n["\u0275eld"](0,0,null,null,1,"app-index",[],null,null,null,f,x)),n["\u0275did"](1,4308992,null,0,d,[u.a,t.a],null,null)],function(l,e){l(e,1,0)},null)},{},{},[]),h=o("ZYjt"),w=o("gIcY"),b=o("vVgY"),v=o("77Pd"),C=o("cqp5"),T=o("cN8d"),y=o("FINM"),F=o("Cnro"),S=o("00Wa"),O=o("bk/7"),P=o("kc/u"),I=o("t/Na"),B=o("D2P5"),k=o("93cw"),_=o("pWJ4"),L=o("Ra+i"),R=o("dqN5"),A=o("rueA"),N=o("75gN"),E=o("Icg2"),G=o("15Qf"),H=o("cCs0"),V=o("32hB"),q=o("+qzO"),z=o("Eg5a"),Z=o("/eoz"),j=o("Ta+J"),U=o("YgT5"),$=o("U6nW"),Q=o("q5uA"),J=o("Sw0N"),W=o("bw+9"),X=o("t848"),Y=o("DzW0"),K=o("xxCj"),ll=o("+VQQ"),el=o("MklM"),ol=o("mE+3"),nl=o("ZE82"),ul=o("A0ZU"),tl=o("ZrU1"),dl=o("yyk4"),il=o("ORXF"),al=o("Luhu"),rl=o("GIXE"),sl=o("BXyO"),ml=o("FwoV"),pl=o("TfGO"),cl=o("tO9W"),xl=o("Mxal"),Ml=o("TMZ3"),Dl=o("PSAD"),fl=o("mLgo"),gl=o("4wpK"),hl=o("lP82"),wl=o("1l0z"),bl=o("OoGn"),vl=o("MCiI"),Cl=o("56nz"),Tl=o("ji96"),yl=o("GJQh"),Fl=o("Qz10"),Sl=o("88Zp"),Ol=o("DekO"),Pl=o("B70U"),Il=o("iA9w"),Bl=o("fR0t"),kl=o("zQhG"),_l=o("OnI8"),Ll=o("bkZ1"),Rl=o("TWPA"),Al=o("eqpn"),Nl=o("slj0"),El=o("53vC"),Gl=o("7lqw"),Hl=o("r9i/"),Vl=o("PCNd"),ql=o("6Q8y"),zl=o("/D4B");o.d(e,"IndexModuleNgFactory",function(){return Zl});var Zl=n["\u0275cmf"](a,[],function(l){return n["\u0275mod"]([n["\u0275mpd"](512,n.ComponentFactoryResolver,n["\u0275CodegenComponentFactoryResolver"],[[8,[r.a,s.a,g]],[3,n.ComponentFactoryResolver],n.NgModuleRef]),n["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[n.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),n["\u0275mpd"](5120,h.TransferState,h["\u0275angular_packages_platform_browser_platform_browser_f"],[c.DOCUMENT,n.APP_ID]),n["\u0275mpd"](4608,w["\u0275angular_packages_forms_forms_i"],w["\u0275angular_packages_forms_forms_i"],[]),n["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),n["\u0275mpd"](1073742336,m.q,m.q,[[2,m.w],[2,m.m]]),n["\u0275mpd"](1073742336,b.a,b.a,[]),n["\u0275mpd"](1073742336,v.DxoColCountByScreenModule,v.DxoColCountByScreenModule,[]),n["\u0275mpd"](1073742336,C.DxiItemModule,C.DxiItemModule,[]),n["\u0275mpd"](1073742336,T.DxoLabelModule,T.DxoLabelModule,[]),n["\u0275mpd"](1073742336,y.DxiValidationRuleModule,y.DxiValidationRuleModule,[]),n["\u0275mpd"](1073742336,F.DxoTabPanelOptionsModule,F.DxoTabPanelOptionsModule,[]),n["\u0275mpd"](1073742336,S.DxiTabModule,S.DxiTabModule,[]),n["\u0275mpd"](1073742336,O.DxoButtonOptionsModule,O.DxoButtonOptionsModule,[]),n["\u0275mpd"](1073742336,P.DxIntegrationModule,P.DxIntegrationModule,[c.DOCUMENT,n.NgZone,[2,I.XhrFactory]]),n["\u0275mpd"](1073742336,B.DxTemplateModule,B.DxTemplateModule,[]),n["\u0275mpd"](1073742336,h.BrowserTransferStateModule,h.BrowserTransferStateModule,[]),n["\u0275mpd"](1073742336,k.DxFormModule,k.DxFormModule,[]),n["\u0275mpd"](1073742336,_.DxiMenuItemModule,_.DxiMenuItemModule,[]),n["\u0275mpd"](1073742336,L.DxoSearchEditorOptionsModule,L.DxoSearchEditorOptionsModule,[]),n["\u0275mpd"](1073742336,R.DxListModule,R.DxListModule,[]),n["\u0275mpd"](1073742336,A.DxButtonModule,A.DxButtonModule,[]),n["\u0275mpd"](1073742336,N.DxoFormatModule,N.DxoFormatModule,[]),n["\u0275mpd"](1073742336,E.DxNumberBoxModule,E.DxNumberBoxModule,[]),n["\u0275mpd"](1073742336,G.DxoColumnChooserModule,G.DxoColumnChooserModule,[]),n["\u0275mpd"](1073742336,H.DxoColumnFixingModule,H.DxoColumnFixingModule,[]),n["\u0275mpd"](1073742336,V.DxoTextsModule,V.DxoTextsModule,[]),n["\u0275mpd"](1073742336,q.DxiColumnModule,q.DxiColumnModule,[]),n["\u0275mpd"](1073742336,z.DxoHeaderFilterModule,z.DxoHeaderFilterModule,[]),n["\u0275mpd"](1073742336,Z.DxoLookupModule,Z.DxoLookupModule,[]),n["\u0275mpd"](1073742336,j.DxoFormItemModule,j.DxoFormItemModule,[]),n["\u0275mpd"](1073742336,U.DxoEditingModule,U.DxoEditingModule,[]),n["\u0275mpd"](1073742336,$.DxoFormModule,$.DxoFormModule,[]),n["\u0275mpd"](1073742336,Q.DxoPopupModule,Q.DxoPopupModule,[]),n["\u0275mpd"](1073742336,J.DxoAnimationModule,J.DxoAnimationModule,[]),n["\u0275mpd"](1073742336,W.DxoHideModule,W.DxoHideModule,[]),n["\u0275mpd"](1073742336,X.DxoShowModule,X.DxoShowModule,[]),n["\u0275mpd"](1073742336,Y.DxoPositionModule,Y.DxoPositionModule,[]),n["\u0275mpd"](1073742336,K.DxoAtModule,K.DxoAtModule,[]),n["\u0275mpd"](1073742336,ll.DxoBoundaryOffsetModule,ll.DxoBoundaryOffsetModule,[]),n["\u0275mpd"](1073742336,el.DxoCollisionModule,el.DxoCollisionModule,[]),n["\u0275mpd"](1073742336,ol.DxoMyModule,ol.DxoMyModule,[]),n["\u0275mpd"](1073742336,nl.DxoOffsetModule,nl.DxoOffsetModule,[]),n["\u0275mpd"](1073742336,ul.DxiToolbarItemModule,ul.DxiToolbarItemModule,[]),n["\u0275mpd"](1073742336,tl.DxoExportModule,tl.DxoExportModule,[]),n["\u0275mpd"](1073742336,dl.DxoFilterBuilderModule,dl.DxoFilterBuilderModule,[]),n["\u0275mpd"](1073742336,il.DxiCustomOperationModule,il.DxiCustomOperationModule,[]),n["\u0275mpd"](1073742336,al.DxiFieldModule,al.DxiFieldModule,[]),n["\u0275mpd"](1073742336,rl.DxoFilterOperationDescriptionsModule,rl.DxoFilterOperationDescriptionsModule,[]),n["\u0275mpd"](1073742336,sl.DxoGroupOperationDescriptionsModule,sl.DxoGroupOperationDescriptionsModule,[]),n["\u0275mpd"](1073742336,ml.DxoFilterBuilderPopupModule,ml.DxoFilterBuilderPopupModule,[]),n["\u0275mpd"](1073742336,pl.DxoFilterPanelModule,pl.DxoFilterPanelModule,[]),n["\u0275mpd"](1073742336,cl.DxoFilterRowModule,cl.DxoFilterRowModule,[]),n["\u0275mpd"](1073742336,xl.DxoOperationDescriptionsModule,xl.DxoOperationDescriptionsModule,[]),n["\u0275mpd"](1073742336,Ml.DxoGroupingModule,Ml.DxoGroupingModule,[]),n["\u0275mpd"](1073742336,Dl.DxoGroupPanelModule,Dl.DxoGroupPanelModule,[]),n["\u0275mpd"](1073742336,fl.DxoLoadPanelModule,fl.DxoLoadPanelModule,[]),n["\u0275mpd"](1073742336,gl.DxoMasterDetailModule,gl.DxoMasterDetailModule,[]),n["\u0275mpd"](1073742336,hl.DxoPagerModule,hl.DxoPagerModule,[]),n["\u0275mpd"](1073742336,wl.DxoPagingModule,wl.DxoPagingModule,[]),n["\u0275mpd"](1073742336,bl.DxoRemoteOperationsModule,bl.DxoRemoteOperationsModule,[]),n["\u0275mpd"](1073742336,vl.DxoScrollingModule,vl.DxoScrollingModule,[]),n["\u0275mpd"](1073742336,Cl.DxoSearchPanelModule,Cl.DxoSearchPanelModule,[]),n["\u0275mpd"](1073742336,Tl.DxoSelectionModule,Tl.DxoSelectionModule,[]),n["\u0275mpd"](1073742336,yl.DxiSortByGroupSummaryInfoModule,yl.DxiSortByGroupSummaryInfoModule,[]),n["\u0275mpd"](1073742336,Fl.DxoSortingModule,Fl.DxoSortingModule,[]),n["\u0275mpd"](1073742336,Sl.DxoStateStoringModule,Sl.DxoStateStoringModule,[]),n["\u0275mpd"](1073742336,Ol.DxoSummaryModule,Ol.DxoSummaryModule,[]),n["\u0275mpd"](1073742336,Pl.DxiGroupItemModule,Pl.DxiGroupItemModule,[]),n["\u0275mpd"](1073742336,Il.DxoValueFormatModule,Il.DxoValueFormatModule,[]),n["\u0275mpd"](1073742336,Bl.DxiTotalItemModule,Bl.DxiTotalItemModule,[]),n["\u0275mpd"](1073742336,kl.DxDataGridModule,kl.DxDataGridModule,[]),n["\u0275mpd"](1073742336,_l.DxTextBoxModule,_l.DxTextBoxModule,[]),n["\u0275mpd"](1073742336,Ll.DxoCalendarOptionsModule,Ll.DxoCalendarOptionsModule,[]),n["\u0275mpd"](1073742336,Rl.DxoDisplayFormatModule,Rl.DxoDisplayFormatModule,[]),n["\u0275mpd"](1073742336,Al.DxDateBoxModule,Al.DxDateBoxModule,[]),n["\u0275mpd"](1073742336,w["\u0275angular_packages_forms_forms_bb"],w["\u0275angular_packages_forms_forms_bb"],[]),n["\u0275mpd"](1073742336,w.FormsModule,w.FormsModule,[]),n["\u0275mpd"](1073742336,Nl.DxTextAreaModule,Nl.DxTextAreaModule,[]),n["\u0275mpd"](1073742336,El.DxPopupModule,El.DxPopupModule,[]),n["\u0275mpd"](1073742336,Gl.DxFileUploaderModule,Gl.DxFileUploaderModule,[]),n["\u0275mpd"](1073742336,Hl.DxSelectBoxModule,Hl.DxSelectBoxModule,[]),n["\u0275mpd"](1073742336,Vl.a,Vl.a,[]),n["\u0275mpd"](1073742336,ql.AvatarModule,ql.AvatarModule,[]),n["\u0275mpd"](1073742336,zl.a,zl.a,[]),n["\u0275mpd"](1073742336,a,a,[]),n["\u0275mpd"](1024,m.k,function(){return[[{path:"",component:i.a,children:[{path:"",component:d}]}]]},[])])})}}]);