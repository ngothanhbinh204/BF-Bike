<?php
$home_banner_list = get_field('home_banner_list');
if ($home_banner_list) :
?>
	<section class="section-home-banner">
		<div class="banner-ratio img-ratio ratio:pt-[960_1920]">
			<div class="swiper">
				<div class="swiper-wrapper">
                    <?php foreach ($home_banner_list as $banner) : 
                        $desktop_image = $banner['image'];
                        $mobile_image = $banner['mobile_image'];
                        $title = $banner['title'];
                    ?>
					<div class="swiper-slide" data-title="<?php echo esc_attr(wp_strip_all_tags( $title ) ); ?>">
                        <img class="lozad d-none d-lg-block" data-src="<?php echo esc_url($desktop_image['url']); ?>" alt="<?php echo esc_attr($desktop_image['alt']); ?>" />
                        <?php if ($mobile_image) : ?>
                            <img class="lozad d-block d-lg-none" data-src="<?php echo esc_url($mobile_image['url']); ?>" alt="<?php echo esc_attr($mobile_image['alt']); ?>" />
                        <?php else : ?>
                            <img class="lozad d-block d-lg-none" data-src="<?php echo esc_url($desktop_image['url']); ?>" alt="<?php echo esc_attr($desktop_image['alt']); ?>" />
                        <?php endif; ?>
						<div class="slide-content">
							<div class="container">
								<h2 class="slide-title"><?php echo nl2br(esc_html($title)); ?></h2>
							</div>
						</div>
					</div>
                    <?php endforeach; ?>
				</div>
				<button class="btn btn-slide btn-swiper-prev"><i class="fa-regular fa-angle-left"></i>
				</button>
				<button class="btn btn-slide btn-swiper-next"><i class="fa-regular fa-angle-right"></i>
				</button>
			</div>
			<div class="banner-controls" data-aos="fade-up" data-aos-delay="700" data-aos-duration="800">
				<button class="banner-play-pause" type="button" aria-label="Tạm dừng"><i
						class="fa-solid fa-pause"></i></button>
				<div class="banner-progress-track">
					<div class="banner-progress-fill"></div>
				</div>
			</div>
		</div>
	</section>
<?php endif; ?>
