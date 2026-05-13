<?php
$about_values_title = get_field('about_values_title');
$about_values_bg    = get_field('about_values_bg');
$about_values_list  = get_field('about_values_list');
$bg_style = $about_values_bg ? 'style="background-image: url(' . esc_url($about_values_bg['url']) . ');"' : '';
?>
	<section class="section-about-5" <?php echo $bg_style; ?>>
		<div class="wrap-padding">
			<div class="container">
                <?php if($about_values_title): ?>
				<h2 class="section-title white left" data-ripple-text data-ripple-text-types="words" data-ripple-text-delay="0.08"><?php echo wp_kses_post($about_values_title); ?></h2>
                <?php endif; ?>
                <?php if($about_values_list): ?>
				<div class="block-grid" data-stagger data-stagger-delay="0.18" data-stagger-duration="0.8" data-stagger-dir="bottom">
					<?php foreach($about_values_list as $index => $item): ?>
					<div class="item-grid" data-height-options='{"source": "child", "var": "--height-desc"}' data-stagger-item>
						<div class="child">
							<div class="item-grid-number"><span><?php echo str_pad($index + 1, 2, '0', STR_PAD_LEFT); ?></span></div>
							<div class="item-grid-main">
								<div class="item-grid-title"><span><?php echo esc_html($item['title']); ?></span></div>
								<div class="item-grid-desc" data-height-child>
									<div class="item-grid-desc-inner">
										<?php echo wp_kses_post($item['content']); ?>
									</div>
								</div>
							</div>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
                <?php endif; ?>
			</div>
		</div>
	</section>
