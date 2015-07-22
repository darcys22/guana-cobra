'use strict';

angular.module('myApp.landing', ['ngRoute'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
    templateUrl: 'landing/landing.html',
    controller: 'LandingController'
  });
}])

.controller('LandingController', ['$scope', function($scope) {
  $scope.title = "Our New Foundation";
  $scope.body = 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in voluptate sit, qui epuletur, in dolore, qui torqueatur. Nunc de hominis summo bono quaeritur; Polycratem Samium felicem appellabant. Bonum negas esse divitias, praeposìtum esse dicis? Sed vos squalidius, illorum vides quam niteat oratio. Ut in geometria, prima si dederis, danda sunt omnia. Beatus sibi videtur esse moriens. Duo Reges: constructio interrete. Sint modo partes vitae beatae. Quem si tenueris, non modo meum Ciceronem, sed etiam me ipsum abducas licebit. Ipse Epicurus fortasse redderet, ut Sextus Peducaeus, Sex. Omnes enim iucundum motum, quo sensus hilaretur. Universa enim illorum ratione cum tota vestra confligendum puto. Polycratem Samium felicem appellabant. Sed ille, ut dixi, vitiose. Occultum facinus esse potuerit, gaudebit; Quod eo liquidius faciet, si perspexerit rerum inter eas verborumne sit controversia. Nam ista vestra: Si gravis, brevis; Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Etenim semper illud extra est, quod arte comprehenditur. Quare obscurentur etiam haec, quae secundum naturam esse dicimus, in vita beata; In eo enim positum est id, quod dicimus esse expetendum. Nunc omni virtuti vitium contrario nomine opponitur. Consequatur summas voluptates non modo parvo, sed per me nihilo, si potest; Et quidem illud ipsum non nimium probo et tantum patior, philosophum loqui de cupiditatibus finiendis. Inde igitur, inquit, ordiendum est. Callipho ad virtutem nihil adiunxit nisi voluptatem, Diodorus vacuitatem doloris. Egone non intellego, quid sit don Graece, Latine voluptas? Quid turpius quam sapientis vitam ex insipientium sermone pendere? Tum Piso: Quoniam igitur aliquid omnes, quid Lucius noster? Itaque hic ipse iam pridem est reiectus; Iam in altera philosophiae parte. Dic in quovis conventu te omnia facere, ne doleas. Habes, inquam, Cato, formam eorum, de quibus loquor, philosophorum. Quid, quod homines infima fortuna, nulla spe rerum gerendarum, opifices denique delectantur historia? Quo plebiscito decreta a senatu est consuli quaestio Cn. Que Manilium, ab iisque M. Cur igitur, inquam, res tam dissimiles eodem nomine appellas? Laelius clamores sofòw ille so lebat Edere compellans gumias ex ordine nostros. Aliena dixit in physicis nec ea ipsa, quae tibi probarentur; At enim hic etiam dolore. Dici enim nihil potest verius. Fortemne possumus dicere eundem illum Torquatum?";

}]);
