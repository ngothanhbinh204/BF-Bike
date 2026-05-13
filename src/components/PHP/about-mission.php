<?php
$about_mission_title    = get_field('about_mission_title');
$about_mission_subtitle = get_field('about_mission_subtitle');
$about_mission_image    = get_field('about_mission_image');
$about_mission_list     = get_field('about_mission_list');
?>
	<section class="section-mission">
		<div class="container">
			<div class="mission-inner">
                <?php if($about_mission_image): ?>
				<div class="mission-image" data-aos="fade-right" data-aos-duration="1000">
					<div class="img-ratio ratio:pt-[470_678]">
						<img class="lozad" data-src="<?php echo esc_url($about_mission_image['url']); ?>" alt="<?php echo esc_attr($about_mission_image['alt']); ?>" />
					</div>
				</div>
                <?php endif; ?>
				<div class="mission-content">
                    <?php if($about_mission_title): ?>
					<h2 class="section-title" data-ripple-text data-ripple-text-types="words" data-ripple-text-delay="0.07"><?php echo wp_kses_post($about_mission_title); ?></h2>
                    <?php endif; ?>
                    <?php if($about_mission_subtitle): ?>
					<p class="mission-subtitle" data-aos="fade-up" data-aos-delay="100"><?php echo esc_html($about_mission_subtitle); ?></p>
                    <?php endif; ?>
                    <?php if($about_mission_list): ?>
					<ul class="mission-list" data-stagger data-stagger-delay="0.13" data-stagger-duration="0.6">
						<?php foreach($about_mission_list as $index => $item): ?>
						<li class="mission-item" data-stagger-item>
							<span class="mission-item__num"><?php echo str_pad($index + 1, 2, '0', STR_PAD_LEFT); ?></span>
							<p class="mission-item__text"><?php echo esc_html($item['text']); ?></p>
						</li>
						<?php endforeach; ?>
					</ul>
                    <?php endif; ?>
				</div>
			</div>
		</div>
	</section>
