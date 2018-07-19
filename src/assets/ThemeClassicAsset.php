<?php
namespace onix\assets;

/**
 * Asset bundle for the classic theme for [[Select2]] widget.
 */
class ThemeClassicAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->setSourcePath(__DIR__ . '../..//assets');
        $this->setupAssets('css', ['css/select2-classic']);
        parent::init();
    }
}
