
(function () {

	var defaults = {
			color: 'rgba(255,0,0,0.5)',
			radius: 100,
			duration: 3000
		},
		PulseEffect = function () {

			this.id = 'pulse';

			this.run = function (twinkleEvent, options, callback) {

				var settings = $.extend({}, defaults, options),
					size = settings.radius * 2,
					opacityIpl = new Objects.Interpolator([ 0, 1, 0.6, 1, 0.6, 1, 0 ]),
					radiusIpl = new Objects.Interpolator([ 0, settings.radius, settings.radius * 0.6, settings.radius, settings.radius * 0.6, settings.radius, 0 ]),
					frame = function (frameEvent) {

						var radius = radiusIpl.get(frameEvent.frac),
							opacity = opacityIpl.get(frameEvent.frac),
							ctx = frameEvent.ctx;

						ctx
							.clear()
							.opacity(opacity)
							.path()
							.circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
							.fill(settings.color);
					};

				new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
			};
		};

	$.twinkle.add(new PulseEffect());

}());
