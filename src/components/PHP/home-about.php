<?php
$home_about_label = get_field('home_about_label');
$home_about_title = get_field('home_about_title');
$home_about_image = get_field('home_about_image');
$home_about_intro = get_field('home_about_intro');
$home_about_content = get_field('home_about_content');
$home_about_stats = get_field('home_about_stats');
$home_about_button = get_field('home_about_button');
?>
<section class="section-about">
	<div class="container-about">
		<div class="row">
			<div class="about-left lg:w-6/12">
				<div class="group-header">
					<?php if($home_about_label): ?>
					<p class="about-label" data-aos="fade-up"><?php echo esc_html($home_about_label); ?></p>
					<?php endif; ?>
					<?php if($home_about_title): ?>
					<h2 class="about-heading" data-ripple-text data-ripple-text-types="lines"
						data-ripple-text-delay="0.08"><?php echo wp_kses_post($home_about_title); ?></h2>
					<?php endif; ?>
				</div>
				<div class="about-image" data-aos="fade-right" data-aos-duration="900">
					<div class="img-ratio ratio:pt-[596_860]">
						<?php if($home_about_image): ?>
						<img class="lozad" data-src="<?php echo esc_url($home_about_image['url']); ?>"
							alt="<?php echo esc_attr($home_about_image['alt']); ?>" />
						<?php endif; ?>
					</div>
				</div>
			</div>
			<div class="about-right lg:w-6/12">
				<?php if($home_about_intro): ?>
				<p class="about-intro" data-aos="fade-up" data-aos-delay="100">
					<?php echo esc_html($home_about_intro); ?></p>
				<?php endif; ?>
				<?php if($home_about_content): ?>
				<div class="about-text" data-aos="fade-up" data-aos-delay="150">
					<?php echo wp_kses_post($home_about_content); ?>
				</div>
				<?php endif; ?>

				<?php if($home_about_stats): ?>
				<div class="about-stats" data-stagger data-stagger-delay="0.14" data-stagger-duration="0.65">
					<?php foreach($home_about_stats as $stat): ?>
					<div class="stat-item" data-stagger-item>
						<p class="stat-number"><span
								data-countup="<?php echo esc_attr($stat['number']); ?>"><?php echo esc_html($stat['number']); ?></span><span
								class="stat-suffix"><?php echo esc_html($stat['suffix']); ?></span></p>
						<div class="stat-desc">
							<div class="dot"></div><span
								class="stat-unit"><?php echo esc_html($stat['unit']); ?></span><span class="desc">
								<?php echo esc_html($stat['desc']); ?></span>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>

				<?php if($home_about_button): ?>
				<a class="btn btn-primary-outline" href="<?php echo esc_url($home_about_button['url']); ?>"
					data-aos="fade-up"
					data-aos-delay="200"><span><?php echo esc_html($home_about_button['title']); ?></span><i
						class="fa-regular fa-arrow-right"></i></a>
				<?php endif; ?>
				<div class="about-brand-text">BFBIKE</div>
			</div>
		</div>
	</div>
</section>