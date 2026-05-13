<?php
$home_video_title = get_field('home_video_title');
$home_video_file = get_field('home_video_file');
$home_video_button = get_field('home_video_button');
?>
	<section class="section-video-banner">
		<div class="container">
			<div class="container-inner" data-aos="zoom-in" data-aos-duration="1000">
				<div class="video-box img-ratio ratio:pt-[650_1400]">
                    <?php if($home_video_file): ?>
					<video src="<?php echo esc_url($home_video_file); ?>" autoplay muted loop playsinline></video>
                    <?php endif; ?>
					<div class="video-overlay"></div>
					<div class="video-content">
                        <?php if($home_video_title): ?>
					<h2 class="video-title" data-ripple-text data-ripple-text-types="chars" data-ripple-text-delay="0.05"><?php echo esc_html($home_video_title); ?></h2>
                        <?php endif; ?>
                        
                        <?php if($home_video_button): ?>
                        <a class="btn btn-white" href="<?php echo esc_url($home_video_button['url']); ?>"><span><?php echo esc_html($home_video_button['title']); ?></span><i class="fa-regular fa-arrow-right"></i></a>
                        <?php endif; ?>
					</div>
				</div>
			</div>
		</div>
	</section>
